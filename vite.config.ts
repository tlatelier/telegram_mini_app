import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => {
    // BASE_PATH задаётся через cross-env при деплое на gh-pages
    const baseRaw = (globalThis as any)?.process?.env?.BASE_PATH ?? '/';
    const base = baseRaw.endsWith('/') ? baseRaw : `${baseRaw}/`;

    return {
        base,
        plugins: [react()],
        css: {
            preprocessorOptions: {
                less: {
                    // Прокидываем base в Less, чтобы url("/fonts/...") и прочие public-ассеты
                    // работали и в корне домена, и в подпапке GH Pages.
                    additionalData: `@base-url: "${base}";\n`,
                },
            },
        },
        resolve: {
            alias: {
                '@entities': '/src/entities',
                '@pages': '/src/pages',
                '@shared': '/src/shared',
                '@widgets': '/src/widgets',
            },
        },
    };
});
