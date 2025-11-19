const CRM_FIELDS = {
    // Данные клиента / Client data
    CD_NAME: 'NAME', // Имя, фамилия и отчество
    CD_PHONE: 'PHONE', // Мобильный телефон для связи
    CD_TELEGRAM: 'UF_CRM_1758997101143', // Telegram для связи

    // Индивидуальная поездка / Individual trip
    IT_DURATION: 'UF_CRM_1758997201908', // Длительность поездки
    IT_GROUP_STRUCTURE: 'UF_CRM_1758998408031', // Состав поездки (ID)
    IT_TEMPO: 'UF_CRM_1758998591122', // Темп поездки (ID)
    IT_INTERESTS: 'UF_CRM_1758999013773', // Интересы
    IT_BUDGET: 'UF_CRM_1760304860408', // Бюджет поездки

    // Дополнительные поля, зависящие от типа поездки и источника заявки
    COMMON_TITLE: 'TITLE', // Название лида
    COMMON_TYPE: 'UF_CRM_1757263997359', // Тип поездки
    COMMON_SOURCE: 'UF_CRM_1757261670989', // Источник заявки
    COMMON_PRICE: 'UF_CRM_1757265423425', // Цена поездки (для стоимости группового путешествия)

    COMMON_BITRIX_SOURCE: 'SOURCE_ID', // Источник заявки в Bitrix24
} as const;

export {
    CRM_FIELDS,
};
