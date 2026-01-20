import { App } from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StartPage } from './pages/start/StartPage';
import { GalleryPage } from './pages/gallery/GalleryPage';
import { TripDetailsPage } from './pages/trip/TripDetailsPage';
import { PrivateTripsPage } from './pages/private/PrivateTripsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './app/styles/normalize.less';
import './app/styles/typography.less';

// Анти-кэш для JS/CSS на GH Pages/в Telegram WebView:
// - ассеты Vite (js/css) и так с хешами
// - но HTML может агрессивно кешироваться, из-за чего новые хеши не подхватываются
// Решение: читаем `version.json` (cache: no-store) и при смене версии делаем reload с query-параметром.
(() => {
    try {
        if (!(import.meta as any)?.env?.PROD) {
            return;
        }

        const base: string = (import.meta as any)?.env?.BASE_URL ?? '/';
        const url = `${base}version.json?t=${Date.now()}`;
        const key = 'app_version';

        fetch(url, { cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                const version = (data as any)?.version ? String((data as any).version) : '';
                if (!version) return;

                const stored = localStorage.getItem(key);

                // Первое посещение — просто запоминаем версию (без лишнего перезагруза).
                if (!stored) {
                    localStorage.setItem(key, version);
                    return;
                }

                // При смене версии — перезагрузка страницы с cache-busting query.
                if (stored !== version) {
                    localStorage.setItem(key, version);
                    const next = new URL(window.location.href);
                    next.searchParams.set('v', version);
                    window.location.replace(next.toString());
                }
            })
            .catch(() => {});
    } catch {}
})();

// Принудительно разворачиваем Telegram WebApp и синхронизируем высоту в CSS-переменную
(() => {
    try {
        // @ts-ignore
        const tg = (window as any)?.Telegram?.WebApp;
        tg?.ready?.();
        tg?.expand?.();
    } catch {}
})();

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                { index: true, element: <StartPage /> },
                { path: 'private', element: <PrivateTripsPage /> },
                { path: 'gallery', element: <GalleryPage /> },
                { path: 'trip/:id', element: <TripDetailsPage /> },
            ],
        },
    ],
    { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
