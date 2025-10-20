import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import { StartPage } from "./pages/start/StartPage";
import { PrivateTripsPage } from "./pages/private/PrivateTripsPage";
import { GalleryPage } from "./pages/gallery/GalleryPage";
import { TripDetailsPage } from "./pages/trip/TripDetailsPage";
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

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { index: true, element: <StartPage /> },
                { path: "private", element: <PrivateTripsPage /> },
                { path: "gallery", element: <GalleryPage /> },
                { path: "trip/:id", element: <TripDetailsPage /> },
            ],
        },
    ],
    { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
