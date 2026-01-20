import {
    useRef,
    useEffect,
} from 'react';

import './bitrix24-inline-form.less';
import { getTelegramUsername } from '@shared/api/services/telegram';

type Bitrix24InlineFormProps = {
    /** Например: "inline/9/k3ksjn" */
    b24Form: string;
    /** Например: "https://cdn-ru.bitrix24.ru/b34565224/crm/form/loader_9.js" */
    loaderUrl: string;
    className?: string;
    /** Текст с выбранными предпочтениями (уйдёт в скрытое текстовое поле). */
    preferencesText?: string;
    /** Если передать — будет использовано вместо username из Telegram WebApp. */
    telegramUsername?: string;
};

const Bitrix24InlineForm = (props: Bitrix24InlineFormProps) => {
    const {
        b24Form,
        loaderUrl,
        className,
        preferencesText,
        telegramUsername,
    } = props;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isMountedRef = useRef(false);
    const preferencesTextRef = useRef<string | undefined>(preferencesText);
    const telegramUsernameRef = useRef<string | undefined>(telegramUsername);

    useEffect(() => {
        preferencesTextRef.current = preferencesText;
    }, [preferencesText]);

    useEffect(() => {
        telegramUsernameRef.current = telegramUsername;
    }, [telegramUsername]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

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

        const onClick = (event: MouseEvent) => {
            const target = event.target as Element | null;

            if (!target) {
                return;
            }

            const btn = target.closest('.b24-form-btn');

            if (!btn) {
                return;
            }

            // 1) Перед отправкой проставляем скрытые поля (чтобы Bitrix успел забрать значения).
            const tgNick = normalizeTelegramNick(telegramUsernameRef.current ?? getTelegramUsername());
            const prefsText = (preferencesTextRef.current ?? '').trim();

            const tgField = container.querySelector('.b24-form-field.b24-form-field-string.b24-form-control-string');
            const prefsField = container.querySelector('.b24-form-field.b24-form-field-text.b24-form-control-text');

            if (tgNick) {
                setControlValue(tgField, tgNick);
            }

            if (prefsText) {
                setControlValue(prefsField, prefsText);
            }

            // 2) После того как Bitrix применит валидацию — трясём только реально невалидные поля.
            setTimeout(() => {
                const fields = container.querySelectorAll('.b24-form-field.b24-form-control-alert');

                fields.forEach((field) => {
                    (field as HTMLElement)?.animate([
                        { transform: 'translate3d(0, 0, 0)' },
                        { transform: 'translate3d(-6px, 0, 0)' },
                        { transform: 'translate3d(6px, 0, 0)' },
                        { transform: 'translate3d(-5px, 0, 0)' },
                        { transform: 'translate3d(5px, 0, 0)' },
                        { transform: 'translate3d(-3px, 0, 0)' },
                        { transform: 'translate3d(3px, 0, 0)' },
                        { transform: 'translate3d(0, 0, 0)' },
                    ], { duration: 360 });
                });
            }, 0);
        };

        // Делегирование клика: кнопка появляется/пересоздаётся после загрузки формы,
        // поэтому слушаем клики на контейнере.
        container.addEventListener('click', onClick);

        return () => {
            container.removeEventListener('click', onClick);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        // React StrictMode в dev может монтировать/размонтировать эффекты дважды.
        // Делаем вставку идемпотентной для контейнера.
        if (isMountedRef.current) {
            return;
        }

        isMountedRef.current = true;

        container.innerHTML = '';

        const script = document.createElement('script');
        script.setAttribute('data-b24-form', b24Form);
        script.setAttribute('data-skip-moving', 'true');
        script.type = 'text/javascript';

        // Официальный сниппет Bitrix24 (inline форма) — вставляем как inline JS.
        script.text = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${loaderUrl}');`;

        container.appendChild(script);

        return () => {
            container.innerHTML = '';
            isMountedRef.current = false;
        };
    }, [b24Form, loaderUrl]);

    return (
        <div
            ref={containerRef}
            className={className}
        />
    );
};

export {
    Bitrix24InlineForm,
};
