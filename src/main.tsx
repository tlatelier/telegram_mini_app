import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./app/styles/normalize.less";
import "./app/styles/typography.less";

// Принудительно разворачиваем Telegram WebApp и синхронизируем высоту в CSS-переменную
(() => {
    try {
        // @ts-ignore
        const tg = (window as any)?.Telegram?.WebApp;
        tg?.ready?.();
        tg?.expand?.();
    } catch {}
})();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
