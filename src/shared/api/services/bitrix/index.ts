import { CRM_FIELDS } from "./crm";

export type CreateCommonPayload = {
    type?: string; // Тип поездки
    price?: string; // Цена поездки (для стоимости группового путешествия)
    title: string; // Название лида
    source: string; // Источник заявки
};

export type CreateClientPayload = {
    name: string; // Имя, фамилия и отчество
    phone: string; // Мобильный телефон для связи
    telegram?: string; // Telegram для связи
};

export type CreateIndividualTripPayload = {
    it_tempo?: string; // Темп поездки
    it_budget?: string; // Бюджет поездки
    it_duration?: string; // Длительность поездки
    it_interests?: string; // Интересы
    it_group_structure?: string; // Состав поездки
};

type CreateLeadPayload = CreateCommonPayload & CreateClientPayload & CreateIndividualTripPayload;

function buildFormData(payload: CreateLeadPayload): URLSearchParams {
    const fields = new URLSearchParams();

    if (payload.title) {
        fields.set(`fields[${CRM_FIELDS.COMMON_TITLE}]`, payload.title);
    }

    if (payload.name) {
        fields.set(`fields[${CRM_FIELDS.CD_NAME}]`, payload.name);
    }

    if (payload.phone) {
        fields.set(`fields[${CRM_FIELDS.CD_PHONE}][0][VALUE]`, payload.phone);
        fields.set(`fields[${CRM_FIELDS.CD_PHONE}][0][VALUE_TYPE]`, "MOBILE");
    }

    if (payload.telegram) {
        fields.set(`fields[${CRM_FIELDS.CD_TELEGRAM}]`, payload.telegram);
    }

    // Доп. поля: тип, источник, цена
    if (payload.type) {
        fields.set(`fields[${CRM_FIELDS.COMMON_TYPE}]`, payload.type);
    }

    if (payload.source) {
        fields.set(`fields[${CRM_FIELDS.COMMON_SOURCE}]`, "Telegram");
    }

    if (payload.price) {
        fields.set(`fields[${CRM_FIELDS.COMMON_PRICE}]`, payload.price);
    }

    // Индивидуальная поездка
    if (payload.it_duration) {
        fields.set(`fields[${CRM_FIELDS.IT_DURATION}]`, payload.it_duration);
    }

    if (payload.it_group_structure) {
        fields.set(`fields[${CRM_FIELDS.IT_GROUP_STRUCTURE}]`, payload.it_group_structure);
    }

    if (payload.it_tempo) {
        fields.set(`fields[${CRM_FIELDS.IT_TEMPO}]`, payload.it_tempo);
    }

    if (payload.it_interests) {
        fields.set(`fields[${CRM_FIELDS.IT_INTERESTS}]`, payload.it_interests);
    }

    if (payload.it_budget) {
        fields.set(`fields[${CRM_FIELDS.IT_BUDGET}]`, payload.it_budget);
    }

    // Источник заявки в Bitrix24
    fields.set(`fields[${CRM_FIELDS.COMMON_BITRIX_SOURCE}]`, "OTHER");

    // Сообщение в ленту о создании лида
    fields.set("params[REGISTER_SONET_EVENT]", "Y");

    return fields;
}

const createLead = async (payload: CreateLeadPayload) => {
    const webhookUrl = import.meta.env.VITE_BITRIX_WEBHOOK_URL;

    const body = buildFormData(payload);

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body,
        });

        if (!response.ok) {
            const text = await response.text();

            console.warn(`Bitrix24 error: ${response.status} ${text}`);
            return;
        }

        const data = await response.json().catch(() => ({}));

        if (data && typeof data.result === "number") {
            return {
                id: data.result,
            };
        }
    } catch (error) {
        console.warn({ error });
    }

    return null;
};

export { createLead };
