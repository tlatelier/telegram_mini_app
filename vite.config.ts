import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => {
    // BASE_PATH задаётся через cross-env при деплое на gh-pages
    const base = (globalThis as any)?.process?.env?.BASE_PATH ?? '/';

    return {
        base,
        plugins: [react()],
        resolve: {
            alias: {
                '@entities': '/src/entities',
                '@pages': '/src/pages',
                '@widgets': '/src/widgets',
                '@features': '/src/features',
            },
        },
    };
});
