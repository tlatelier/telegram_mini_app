import type { ReactNode } from 'react';
type TripId = string;

type TripDataType = {
    id: TripId;
    date: string;
    background: string;
    destination: string;
    isActive?: boolean;
    title?: string;
    dateStart?: string;
    dateEnd?: string;
    gallery?: string[];
    priceFrom?: number;
    currency?: string;
    locationsCount?: number;
    // Отображение статуса на карточке: по умолчанию вычисляется по isActive
    status?: 'upcoming' | 'wip' | 'past';
    duration?: string;
};

type TripActivityItem =
    | string
    | {
          strong?: string; // часть, которую нужно выделить жирным
          text?: string; // остальной текст после сильной части
          node?: ReactNode; // на случай сложной вёрстки
      };

type TripDayItemType = {
    title: string;
    activities: TripActivityItem[];
    photo?: string;
};

type TripHighlightItemType = {
    title: string;
    text: string;
};

type TripFAQItemType = {
    question: string;
    answer: string | string[];
};

type TripExtraSectionType = {
    title: string;
    items: string[];
};

type TripFinalOfferType = {
    benefits: string[]; // ключевые выгоды тура (3–4 пункта)
    includes: string[]; // короткий список «что входит» (3–4 пункта)
    scarcity?: string; // дефицит/дедлайн
    quote?: { text: string, author?: string };
    ctaPrimaryText?: string; // текст основной кнопки
    ctaSecondaryText?: string; // текст вторичной кнопки
};

type TripDetailsType = {
    id: TripId;
    days: TripDayItemType[];
    highlights?: TripHighlightItemType[];
    faq?: TripFAQItemType[];
    extras?: TripExtraSectionType[];
    finalOffer?: TripFinalOfferType;
};

export type {
    TripId,
    TripDataType,
    TripDayItemType,
    TripDetailsType,
    TripActivityItem,
    TripFinalOfferType,
    TripExtraSectionType,
    TripHighlightItemType,
};
