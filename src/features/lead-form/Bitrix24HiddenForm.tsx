import {
    useRef,
    useEffect,
} from 'react';
import { getTelegramUsername } from '@shared/api/services/telegram';
import './bitrix24-hidden-form.less';

type Bitrix24HiddenFormProps = {
    /** Например: "inline/13/cibjyu" */
    b24Form: string;
    /** Например: "https://cdn-ru.bitrix24.ru/b34565224/crm/form/loader_13.js" */
    loaderUrl: string;
    /** Направление, куда пользователь хочет поехать */
    destination: string;
    /** Отправлять форму автоматически при монтировании */
    autoSubmit?: boolean;
    /** Callback после отправки формы (успех или провал) */
    onSubmitted?(): void;
};

const Bitrix24HiddenForm = (props: Bitrix24HiddenFormProps) => {
    const {
        b24Form,
        loaderUrl,
        destination,
        autoSubmit = false,
        onSubmitted,
    } = props;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isMountedRef = useRef(false);
    const submittedRef = useRef(false);
    const formLoadedRef = useRef(false);
    const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const submitAttemptsRef = useRef(0);
    const maxSubmitAttempts = 10; // Максимум попыток отправки

    const normalizeTelegramNick = (nick?: string) => {
        const n = (nick ?? '').trim();
        if (!n) {
            return '';
        }
        return n.startsWith('@') ? n : `@${n}`;
    };

    const setControlValue = (field: Element | null, value: string) => {
        if (!field) {
            return;
        }

        const control = field.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;

        if (!control) {
            return;
        }

        control.value = value;
        control.dispatchEvent(new Event('input', { bubbles: true }));
        control.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const submitForm = () => {
        // Увеличиваем счётчик попыток
        submitAttemptsRef.current += 1;
        
        // Если превысили лимит попыток, прекращаем
        if (submitAttemptsRef.current > maxSubmitAttempts) {
            return;
        }
        
        const container = containerRef.current;
        if (!container) {
            // Если контейнер размонтирован, пробуем найти форму в body
            // и продолжаем попытки отправки
            setTimeout(() => {
                if (submitAttemptsRef.current <= maxSubmitAttempts && !submittedRef.current) {
                    submitForm();
                }
            }, 200);
            return;
        }
        
        if (submittedRef.current) {
            return;
        }

        // Получаем данные Telegram
        const tgNick = normalizeTelegramNick(getTelegramUsername());

        // Bitrix24 может переместить форму в body, ищем везде
        const searchContainer = document.body;
        const formWrapper = searchContainer.querySelector(`[data-b24-form="${b24Form}"], .b24-form-wrapper`) || container;
        
        // Находим все поля формы (Bitrix24 может использовать разные селекторы)
        const allInputs = formWrapper.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea');
        let tgField: Element | null = null;
        let destField: Element | null = null;

        // Ищем поля по различным признакам
        allInputs.forEach((input) => {
            const field = input.closest('.b24-form-field, .b24-form-control');
            const inputType = (input as HTMLInputElement).type;
            const inputName = (input as HTMLInputElement).name || '';
            const inputId = (input as HTMLInputElement).id || '';
            const placeholder = (input as HTMLInputElement).placeholder || '';
            
            // Поле для Telegram (обычно строка)
            if (!tgField && (
                field?.classList.contains('b24-form-field-string') ||
                field?.classList.contains('b24-form-control-string') ||
                (inputType === 'text' && input.tagName !== 'TEXTAREA') ||
                inputName.toLowerCase().includes('telegram') ||
                inputName.toLowerCase().includes('username') ||
                inputId.toLowerCase().includes('telegram') ||
                inputId.toLowerCase().includes('username') ||
                placeholder.toLowerCase().includes('telegram') ||
                placeholder.toLowerCase().includes('username')
            )) {
                tgField = field || input;
            }
            
            // Поле для направления (обычно текст)
            if (!destField && (
                field?.classList.contains('b24-form-field-text') ||
                field?.classList.contains('b24-form-control-text') ||
                input.tagName === 'TEXTAREA' ||
                inputName.toLowerCase().includes('destination') ||
                inputName.toLowerCase().includes('направление') ||
                inputId.toLowerCase().includes('destination') ||
                inputId.toLowerCase().includes('направление') ||
                placeholder.toLowerCase().includes('направление')
            )) {
                destField = field || input;
            }
        });

        // Если не нашли по классам, используем порядок полей (первое - Telegram, второе - направление)
        if (!tgField && allInputs.length > 0) {
            const firstInput = allInputs[0] as HTMLInputElement;
            if (firstInput.type !== 'hidden' && firstInput.tagName !== 'TEXTAREA') {
                tgField = firstInput.closest('.b24-form-field, .b24-form-control') || firstInput;
            }
        }
        if (!destField && allInputs.length > 1) {
            const secondInput = allInputs[1] as HTMLInputElement | HTMLTextAreaElement;
            if (secondInput.tagName === 'TEXTAREA' || (secondInput as HTMLInputElement).type !== 'hidden') {
                destField = secondInput.closest('.b24-form-field, .b24-form-control') || secondInput;
            }
        } else if (!destField && allInputs.length === 1) {
            // Если только одно поле, используем его для направления
            const singleInput = allInputs[0] as HTMLInputElement | HTMLTextAreaElement;
            if (singleInput.tagName === 'TEXTAREA') {
                destField = singleInput.closest('.b24-form-field, .b24-form-control') || singleInput;
            }
        }

        // Заполняем поля
        if (tgNick && tgField) {
            setControlValue(tgField, tgNick);
        }

        if (destination && destField) {
            setControlValue(destField, destination);
        }

        // Небольшая задержка перед отправкой, чтобы Bitrix успел обработать значения
        // Уменьшаем задержку для более быстрой отправки
        setTimeout(() => {
            try {
                // Ищем кнопку отправки (ищем в formWrapper и в body, так как Bitrix может переместить форму)
                let submitButton = formWrapper.querySelector(
                    '.b24-form-btn, button[type="submit"], .b24-form-btn-submit, button.b24-form-btn, input[type="submit"]'
                ) as HTMLButtonElement | HTMLInputElement | null;

                // Если не нашли в formWrapper, ищем в body
                if (!submitButton) {
                    submitButton = document.body.querySelector(
                        `.b24-form-wrapper[data-b24-form="${b24Form}"] .b24-form-btn, 
                         [data-b24-form="${b24Form}"] button[type="submit"], 
                         .b24-form-btn-submit, 
                         button.b24-form-btn`
                    ) as HTMLButtonElement | HTMLInputElement | null;
                }

                if (submitButton) {
                    // Отправляем форму
                    submittedRef.current = true;
                    submitButton.click();
                } else {
                    // Если кнопка не найдена, пробуем найти форму и отправить её напрямую
                    let form = formWrapper.querySelector('form') as HTMLFormElement | null;
                    if (!form) {
                        form = document.body.querySelector(`[data-b24-form="${b24Form}"] form`) as HTMLFormElement | null;
                    }
                    
                    if (form) {
                        // Пробуем разные способы отправки
                        submittedRef.current = true;
                        try {
                            form.requestSubmit();
                        } catch {
                            try {
                                form.submit();
                            } catch {
                                // Последняя попытка - событие submit
                                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                                form.dispatchEvent(submitEvent);
                            }
                        }
                    } else {
                        // Если форма ещё не загрузилась, пробуем ещё раз через небольшую задержку
                        if (submitAttemptsRef.current < maxSubmitAttempts) {
                            setTimeout(() => {
                                submitForm();
                            }, 300);
                        }
                    }
                }
            } catch (error) {
                // Игнорируем ошибки отправки, форма всё равно попытается отправиться
            } finally {
                // Callback уже вызван в InactiveTripCard, но вызываем на всякий случай
                onSubmitted?.();
            }
        }, 300); // Уменьшили задержку с 500 до 300 мс для более быстрой отправки
    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        // React StrictMode в dev может монтировать/размонтировать эффекты дважды.
        if (isMountedRef.current) {
            return;
        }

        isMountedRef.current = true;

        container.innerHTML = '';

        const script = document.createElement('script');
        script.setAttribute('data-b24-form', b24Form);
        script.setAttribute('data-skip-moving', 'true');
        script.type = 'text/javascript';

        // Официальный сниппет Bitrix24 (inline форма)
        script.text = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${loaderUrl}');`;

        container.appendChild(script);

        // Ждём загрузки формы (Bitrix24 может переместить форму в body)
        const checkFormLoaded = setInterval(() => {
            // Ищем форму в контейнере и в body
            const formInContainer = container.querySelector('.b24-form-wrapper, form');
            const formInBody = document.body.querySelector(`[data-b24-form="${b24Form}"], .b24-form-wrapper`);
            const form = formInContainer || formInBody;
            
            // Проверяем наличие полей
            const hasInputs = form && (form.querySelectorAll('input, textarea').length > 0);
            
            if (form && hasInputs && !formLoadedRef.current) {
                clearInterval(checkFormLoaded);
                formLoadedRef.current = true;
                
                // Отправляем автоматически только если autoSubmit = true
                if (autoSubmit && !submittedRef.current) {
                    // Уменьшаем задержку для более быстрой отправки
                    setTimeout(() => {
                        submitForm();
                    }, 500);
                }
            }
        }, 200);

        // Таймаут на случай, если форма не загрузится
        setTimeout(() => {
            clearInterval(checkFormLoaded);
            formLoadedRef.current = true;
            if (autoSubmit && !submittedRef.current) {
                // Пробуем отправить даже если форма не полностью загрузилась
                submitForm();
            }
        }, 8000);

        return () => {
            // Не очищаем контейнер сразу, даём время форме отправиться
            // Очищаем через 3 секунды после размонтирования
            if (cleanupTimeoutRef.current) {
                clearTimeout(cleanupTimeoutRef.current);
            }
            
            cleanupTimeoutRef.current = setTimeout(() => {
                if (container) {
                    container.innerHTML = '';
                }
                isMountedRef.current = false;
                submittedRef.current = false;
                formLoadedRef.current = false;
            }, 3000);
        };
    }, [b24Form, loaderUrl, destination, autoSubmit]);

    // Скрытый контейнер для формы
    return (
        <div
            ref={containerRef}
            className="b24-form-hidden"
            style={{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                opacity: 0,
                pointerEvents: 'none',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
                visibility: 'hidden',
                zIndex: -9999,
            }}
        />
    );
};

export {
    Bitrix24HiddenForm,
};
