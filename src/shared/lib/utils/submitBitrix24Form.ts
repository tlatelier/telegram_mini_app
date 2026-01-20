import { getTelegramUsername } from '@shared/api/services/telegram';

type SubmitBitrix24FormParams = {
    /** Например: "inline/13/cibjyu" */
    b24Form: string;
    /** Например: "https://cdn-ru.bitrix24.ru/b34565224/crm/form/loader_13.js" */
    loaderUrl: string;
    /** Направление, куда пользователь хочет поехать */
    destination: string;
};

const normalizeTelegramNick = (nick?: string) => {
    const n = (nick ?? '').trim();
    if (!n) {
        return '';
    }
    return n.startsWith('@') ? n : `@${n}`;
};

const clearFormErrors = (formWrapper: Element) => {
    // Удаляем все сообщения об ошибках
    const errorMessages = formWrapper.querySelectorAll('.b24-form-control-alert, .b24-form-field-alert, .b24-form-error, .error-message, [class*="error"], [class*="alert"]');
    errorMessages.forEach((error) => {
        error.remove();
    });
    
    // Убираем классы ошибок с полей
    const errorFields = formWrapper.querySelectorAll('.b24-form-field, .b24-form-control, input, textarea');
    errorFields.forEach((field) => {
        field.classList.remove('b24-form-control-alert', 'b24-form-field-alert', 'b24-form-error', 'error', 'has-error');
    });
    
    // Сбрасываем форму
    const form = formWrapper.querySelector('form') as HTMLFormElement | null;
    if (form) {
        form.reset();
    }
    
    // Очищаем все поля
    const allInputs = formWrapper.querySelectorAll('input, textarea');
    allInputs.forEach((input) => {
        const control = input as HTMLInputElement | HTMLTextAreaElement;
        if (control.type !== 'submit' && control.type !== 'button' && control.type !== 'hidden') {
            control.value = '';
            control.classList.remove('b24-form-control-alert', 'b24-form-field-alert', 'error', 'has-error');
        }
    });
    
    console.log('[Bitrix24] Форма очищена от ошибок');
};

const setControlValue = (field: Element | null, value: string) => {
    if (!field || !value) {
        console.log('[Bitrix24] setControlValue: поле или значение пустое', { field: !!field, value });
        return;
    }

    // Пробуем найти control разными способами
    let control = field.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
    
    // Если не нашли через querySelector, возможно field сам является input/textarea
    if (!control && (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA')) {
        control = field as HTMLInputElement | HTMLTextAreaElement;
    }

    if (!control) {
        console.log('[Bitrix24] setControlValue: не найден control в поле', field);
        return;
    }

    console.log('[Bitrix24] setControlValue: устанавливаем значение', { 
        tagName: control.tagName, 
        type: (control as HTMLInputElement).type,
        value,
        currentValue: control.value 
    });

    // Устанавливаем значение напрямую
    control.value = value;
    
    // Также устанавливаем через setter если есть
    try {
        Object.defineProperty(control, 'value', {
            value: value,
            writable: true,
            configurable: true
        });
    } catch (e) {
        // Игнорируем
    }
    
    // Триггерим события для Bitrix24
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    
    control.dispatchEvent(inputEvent);
    control.dispatchEvent(changeEvent);
    
    // Проверяем что значение установилось
    const finalValue = control.value;
    console.log('[Bitrix24] setControlValue: значение после установки', finalValue);
    
    if (finalValue !== value) {
        console.warn('[Bitrix24] setControlValue: значение не установилось! Ожидали:', value, 'Получили:', finalValue);
        // Пробуем ещё раз
        control.value = value;
        control.dispatchEvent(new Event('input', { bubbles: true }));
        control.dispatchEvent(new Event('change', { bubbles: true }));
    }
};

/**
 * Отправляет данные в Bitrix24 форму независимо от компонентов React
 * Создаёт скрытый контейнер в document.body и работает там
 */
export const submitBitrix24Form = (params: SubmitBitrix24FormParams): void => {
    const { b24Form, loaderUrl, destination } = params;

    // Создаём уникальный ID для контейнера
    const containerId = `b24-form-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Создаём контейнер в body, чтобы он не зависел от React компонентов
    const container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = `
        position: absolute;
        left: -9999px;
        top: -9999px;
        opacity: 0;
        pointer-events: none;
        width: 1px;
        height: 1px;
        overflow: hidden;
        visibility: hidden;
        z-index: -9999;
    `;
    document.body.appendChild(container);

    // Получаем данные Telegram
    const tgNick = normalizeTelegramNick(getTelegramUsername());

    // Удаляем старые формы с таким же data-b24-form, чтобы не было конфликтов
    const oldForms = document.body.querySelectorAll(`[data-b24-form="${b24Form}"], .b24-form-wrapper[data-b24-form="${b24Form}"]`);
    oldForms.forEach((oldForm) => {
        try {
            oldForm.remove();
        } catch (e) {
            // Игнорируем ошибки
        }
    });
    
    // Создаём скрипт для загрузки формы Bitrix24
    const script = document.createElement('script');
    script.setAttribute('data-b24-form', b24Form);
    script.setAttribute('data-skip-moving', 'true');
    script.type = 'text/javascript';
    script.text = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${loaderUrl}');`;
    
    container.appendChild(script);

    let submitAttempts = 0;
    const maxAttempts = 20;
    let submitted = false;
    let formWasReset = false; // Флаг, что форма была перезагружена через "Заполнить еще раз"

    // Отслеживаем клики на кнопку "Заполнить еще раз"
    const checkForResetButton = () => {
        const resetButtons = document.body.querySelectorAll('button, a, [class*="reset"], [class*="again"], [class*="еще"]');
        resetButtons.forEach((btn) => {
            const text = btn.textContent?.toLowerCase() || '';
            if (text.includes('заполнить') && (text.includes('еще') || text.includes('снова'))) {
                btn.addEventListener('click', () => {
                    formWasReset = true;
                    submitted = true; // Останавливаем попытки отправки
                    console.log('[Bitrix24] Обнаружена кнопка "Заполнить еще раз", останавливаем автоматическую отправку');
                }, { once: true });
            }
        });
    };

    const trySubmit = () => {
        if (submitted || submitAttempts >= maxAttempts || formWasReset) {
            if (formWasReset) {
                console.log('[Bitrix24] Форма была перезагружена пользователем, не заполняем автоматически');
            }
            return;
        }

        submitAttempts++;

        // Ищем форму в контейнере и в body
        const formInContainer = container.querySelector('.b24-form-wrapper, form');
        const formInBody = document.body.querySelector(`[data-b24-form="${b24Form}"], .b24-form-wrapper`);
        const formWrapper = formInContainer || formInBody;

        if (!formWrapper) {
            // Форма ещё не загрузилась, пробуем ещё раз
            setTimeout(trySubmit, 200);
            return;
        }
        
        // Проверяем, не находится ли форма в состоянии успеха (экран успеха)
        const successScreen = formWrapper.querySelector('.b24-form-success, .b24-form-result-success, [class*="success"]');
        if (successScreen) {
            console.log('[Bitrix24] Обнаружен экран успеха, форма уже отправлена, не заполняем повторно');
            formWasReset = true;
            submitted = true;
            return;
        }
        
        // Проверяем, есть ли кнопка "Заполнить еще раз" - это значит форма уже была отправлена
        const resetButton = formWrapper.querySelector('button, a, [class*="reset"], [class*="again"]');
        if (resetButton) {
            const buttonText = resetButton.textContent?.toLowerCase() || '';
            if (buttonText.includes('заполнить') && (buttonText.includes('еще') || buttonText.includes('снова'))) {
                console.log('[Bitrix24] Обнаружена кнопка "Заполнить еще раз", форма уже была отправлена');
                formWasReset = true;
                submitted = true;
                return;
            }
        }
        
        // Очищаем форму от предыдущих ошибок при первой загрузке
        if (submitAttempts === 1) {
            clearFormErrors(formWrapper);
            // Начинаем отслеживать кнопку перезагрузки
            checkForResetButton();
            
            // Проверяем, не является ли это перезагруженной формой после успешной отправки
            // Если форма только что загрузилась и обязательные поля пустые, возможно это перезагрузка
            const requiredFields = formWrapper.querySelectorAll('input[required], textarea[required], .b24-form-field[required]');
            const allEmpty = Array.from(requiredFields).every((field) => {
                const control = (field as HTMLElement).querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
                return !control || !control.value || control.value.trim() === '';
            });
            
            // Если все обязательные поля пустые и форма только загрузилась, возможно это перезагрузка
            // В этом случае не заполняем автоматически, чтобы не вызвать валидацию
            if (allEmpty && requiredFields.length > 0) {
                console.log('[Bitrix24] Обнаружена форма с пустыми обязательными полями, возможно это перезагрузка после успеха');
                // Не останавливаем полностью, но будем осторожнее
            }
        }

        // Находим все поля формы
        const allInputs = Array.from(formWrapper.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea'));
        let tgField: Element | null = null;
        let destField: Element | null = null;

        // Ищем поля по различным признакам
        allInputs.forEach((input) => {
            const field = input.closest('.b24-form-field, .b24-form-control');
            const inputType = (input as HTMLInputElement).type;
            const inputName = (input as HTMLInputElement).name || '';
            const inputId = (input as HTMLInputElement).id || '';
            const placeholder = ((input as HTMLInputElement).placeholder || '').toLowerCase();
            const isTextarea = input.tagName === 'TEXTAREA';
            const isInput = !isTextarea && inputType === 'text';
            
            // Поле для Telegram: первое поле, input (не textarea), placeholder содержит "telegram"
            if (!tgField && (
                placeholder.includes('telegram') ||
                (isInput && !isTextarea && (
                    field?.classList.contains('b24-form-field-string') ||
                    field?.classList.contains('b24-form-control-string') ||
                    inputName.toLowerCase().includes('telegram') ||
                    inputName.toLowerCase().includes('username') ||
                    inputId.toLowerCase().includes('telegram') ||
                    inputId.toLowerCase().includes('username')
                ))
            )) {
                tgField = field || input;
            }
            
            // Поле для направления: textarea или поле с placeholder "дополнительно" / "направление"
            if (!destField && (
                isTextarea ||
                placeholder.includes('дополнительно') ||
                placeholder.includes('направление') ||
                placeholder.includes('интерес') ||
                field?.classList.contains('b24-form-field-text') ||
                field?.classList.contains('b24-form-control-text') ||
                inputName.toLowerCase().includes('destination') ||
                inputName.toLowerCase().includes('направление') ||
                inputId.toLowerCase().includes('destination') ||
                inputId.toLowerCase().includes('направление')
            )) {
                destField = field || input;
            }
        });

        // Если не нашли по признакам, используем порядок полей:
        // Первое поле (input, не textarea) - Telegram
        // Второе поле (textarea или второй input) - направление
        if (!tgField && allInputs.length > 0) {
            const firstInput = allInputs[0] as HTMLInputElement | HTMLTextAreaElement;
            if (firstInput.tagName !== 'TEXTAREA' && (firstInput as HTMLInputElement).type !== 'hidden') {
                tgField = firstInput.closest('.b24-form-field, .b24-form-control') || firstInput;
            }
        }
        
        if (!destField) {
            // Ищем textarea или второе поле
            const textarea = allInputs.find(input => input.tagName === 'TEXTAREA');
            if (textarea) {
                // Используем сам textarea, а не closest
                destField = textarea;
                console.log('[Bitrix24] Найдено поле направления (textarea) по порядку');
            } else if (allInputs.length > 1) {
                // Если нет textarea, берём второе поле
                const secondInput = allInputs[1] as HTMLInputElement | HTMLTextAreaElement;
                if ((secondInput as HTMLInputElement).type !== 'hidden') {
                    destField = secondInput;
                    console.log('[Bitrix24] Найдено поле направления (второе поле) по порядку');
                }
            }
        }
        
        // Логируем найденные поля для отладки
        if (destField) {
            const destControl = destField.tagName === 'TEXTAREA' || destField.tagName === 'INPUT' 
                ? destField as HTMLInputElement | HTMLTextAreaElement
                : destField.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
            if (destControl) {
                console.log('[Bitrix24] Детали поля направления:', {
                    tagName: destControl.tagName,
                    type: (destControl as HTMLInputElement).type,
                    placeholder: destControl.placeholder,
                    name: destControl.name,
                    id: destControl.id
                });
            }
        }

        // Заполняем поля в правильном порядке:
        // 1. Сначала Telegram ник в первое поле (input)
        // 2. Потом название направления во второе поле (textarea)
        // ВАЖНО: Отправляем форму даже если одно из полей не заполнено
        
        console.log('[Bitrix24] Начинаем заполнение полей...');
        console.log('[Bitrix24] Telegram ник:', tgNick);
        console.log('[Bitrix24] Направление:', destination);
        console.log('[Bitrix24] Найдено поле Telegram:', !!tgField);
        console.log('[Bitrix24] Найдено поле направления:', !!destField);
        
        if (tgNick && tgField) {
            setControlValue(tgField, tgNick);
            console.log('[Bitrix24] ✓ Заполнено поле Telegram:', tgNick);
        } else if (tgField) {
            console.log('[Bitrix24] ⚠ Поле Telegram найдено, но значение пустое');
        } else {
            console.log('[Bitrix24] ✗ Поле Telegram не найдено');
        }

        if (destination && destField) {
            setControlValue(destField, destination);
            
            // Проверяем что значение установилось
            const destControl = destField.tagName === 'TEXTAREA' || destField.tagName === 'INPUT' 
                ? destField as HTMLInputElement | HTMLTextAreaElement
                : destField.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
            
            if (destControl) {
                const actualValue = destControl.value;
                console.log('[Bitrix24] ✓ Заполнено поле направления:', destination, 'Фактическое значение:', actualValue);
                if (actualValue !== destination) {
                    console.error('[Bitrix24] ✗ ОШИБКА: Значение не установилось! Ожидали:', destination, 'Получили:', actualValue);
                }
            }
        } else if (destField) {
            console.log('[Bitrix24] ⚠ Поле направления найдено, но значение пустое');
        } else {
            console.log('[Bitrix24] ✗ Поле направления не найдено');
        }
        
        // Отправляем форму сразу без задержек
        console.log('[Bitrix24] Отправляем форму сразу...');
        
        try {
            // Ищем кнопку отправки
            let submitButton = formWrapper.querySelector(
                '.b24-form-btn, button[type="submit"], .b24-form-btn-submit, button.b24-form-btn, input[type="submit"]'
            ) as HTMLButtonElement | HTMLInputElement | null;

            if (!submitButton) {
                submitButton = document.body.querySelector(
                    `.b24-form-wrapper[data-b24-form="${b24Form}"] .b24-form-btn, 
                     [data-b24-form="${b24Form}"] button[type="submit"], 
                     .b24-form-btn-submit, 
                     button.b24-form-btn`
                ) as HTMLButtonElement | HTMLInputElement | null;
            }

            if (submitButton) {
                submitted = true;
                console.log('[Bitrix24] ✓ Найдена кнопка отправки, отправляем форму...');
                submitButton.click();
                
                // Очищаем форму от ошибок после отправки
                setTimeout(() => {
                    clearFormErrors(formWrapper);
                }, 100);
                
                // Очищаем контейнер через 5 секунд после отправки
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }, 5000);
            } else {
                // Если кнопка не найдена, пробуем найти форму и отправить её напрямую
                let form = formWrapper.querySelector('form') as HTMLFormElement | null;
                if (!form) {
                    form = document.body.querySelector(`[data-b24-form="${b24Form}"] form`) as HTMLFormElement | null;
                }
                
                if (form) {
                    submitted = true;
                    console.log('[Bitrix24] ✓ Найдена форма, отправляем через form.submit()...');
                    try {
                        form.requestSubmit();
                    } catch {
                        try {
                            form.submit();
                        } catch {
                            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                            form.dispatchEvent(submitEvent);
                        }
                    }
                    
                    // Очищаем форму от ошибок после отправки
                    setTimeout(() => {
                        clearFormErrors(formWrapper);
                    }, 100);
                    
                    // Очищаем контейнер через 5 секунд после отправки
                    setTimeout(() => {
                        if (container.parentNode) {
                            container.parentNode.removeChild(container);
                        }
                    }, 5000);
                } else {
                    // Форма ещё не готова, пробуем ещё раз
                    if (submitAttempts < maxAttempts) {
                        setTimeout(trySubmit, 200);
                    } else {
                        // Превышен лимит попыток, очищаем контейнер
                        setTimeout(() => {
                            if (container.parentNode) {
                                container.parentNode.removeChild(container);
                            }
                        }, 1000);
                    }
                }
            }
        } catch (error) {
            console.error('[Bitrix24] Ошибка при отправке формы:', error);
            // Игнорируем ошибки, но продолжаем попытки
            if (submitAttempts < maxAttempts) {
                setTimeout(trySubmit, 200);
            } else {
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }, 1000);
            }
        }
    };

    // Начинаем отслеживать кнопку "Заполнить еще раз" сразу
    checkForResetButton();
    
    // Периодически проверяем наличие кнопки перезагрузки
    const resetButtonChecker = setInterval(() => {
        checkForResetButton();
        // Если форма была перезагружена, останавливаем проверку
        if (formWasReset) {
            clearInterval(resetButtonChecker);
        }
    }, 500);
    
    // Начинаем попытки отправки
    setTimeout(trySubmit, 500);
    
    // Останавливаем проверку кнопки через 30 секунд
    setTimeout(() => {
        clearInterval(resetButtonChecker);
    }, 30000);
};
