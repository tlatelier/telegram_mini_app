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

/**
 * Отправляет данные в Bitrix24 форму
 */
export const submitBitrix24Form = (params: SubmitBitrix24FormParams): void => {
    const { b24Form, loaderUrl, destination } = params;

    // 1. Инициализируем форму, загружаем ее
    const container = document.createElement('div');
    container.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0; pointer-events: none; width: 1px; height: 1px; overflow: hidden; visibility: hidden;';
    document.body.appendChild(container);

    const script = document.createElement('script');
    script.setAttribute('data-b24-form', b24Form);
    script.setAttribute('data-skip-moving', 'true');
    script.type = 'text/javascript';
    script.textContent = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${loaderUrl}');`;
    container.appendChild(script);

    const tgNick = normalizeTelegramNick(getTelegramUsername());

    // 2. Дожидаемся загрузки формы
    const waitForForm = () => {
        const formWrapper = document.body.querySelector('.b24-form-wrapper') || 
                          document.body.querySelector(`[data-b24-form="${b24Form}"]`);
        
        if (!formWrapper) {
            setTimeout(waitForForm, 200);
            return;
        }

        // 3. Находим первый input, заполняем телеграм ник
        const allInputs = Array.from(formWrapper.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea'));
        
        if (allInputs.length === 0) {
            setTimeout(waitForForm, 200);
            return;
        }

        const firstInput = allInputs[0] as HTMLInputElement | HTMLTextAreaElement;
        if (tgNick) {
            firstInput.value = tgNick;
            firstInput.dispatchEvent(new Event('input', { bubbles: true }));
            firstInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // 4. Находим второй input, заполняем направление
        if (allInputs.length > 1 && destination) {
            const secondInput = allInputs[1] as HTMLInputElement | HTMLTextAreaElement;
            secondInput.value = destination;
            secondInput.dispatchEvent(new Event('input', { bubbles: true }));
            secondInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // 5. Отправляем форму
        const submitButton = formWrapper.querySelector('button[type="submit"], input[type="submit"], .b24-form-btn') as HTMLButtonElement | HTMLInputElement | null;
        
        if (submitButton) {
            submitButton.click();
        } else {
            const form = formWrapper.querySelector('form') as HTMLFormElement | null;
            if (form) {
                form.requestSubmit();
            }
        }
    };

    setTimeout(waitForForm, 1000);
};
