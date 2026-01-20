module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({
            // Добавляем вендорные префиксы по browserslist.
            // flexbox: 'no-2009' избегает древнего синтаксиса 2009 года.
            flexbox: 'no-2009',
            // Важно: в dev Vite обычно используется browserslist.development
            // (часто это "last 1 safari version"), из-за чего префиксы для
            // более старого Safari могут НЕ добавляться. Форсим таргеты всегда,
            // чтобы префиксы были и в `npm run dev`.
            overrideBrowserslist: [
                '>0.2%',
                'not dead',
                'not op_mini all',
                'Safari >= 13',
                'iOS >= 13',
            ],
        }),
    ],
};

