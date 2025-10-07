type TripId = string;

type TripDataType = {
    id: TripId;
    isActive: boolean;
    date: string;
    background: string;
    destination: string;
    title?: string;
    dateStart?: string;
    dateEnd?: string;
    gallery?: string[];
    priceFrom?: number;
    currency?: string;
    locationsCount?: number;
    // Отображение статуса на карточке: по умолчанию вычисляется по isActive
    status?: "upcoming" | "past" | "wip";
};

type TripDayItemType = {
    title: string;
    activities: string[];
    photo?: string;
};

type TripHighlightItemType = {
    title: string;
    text: string;
};

type TripDetailsType = {
    id: TripId;
    days: TripDayItemType[];
    highlights?: TripHighlightItemType[];
};

export type { TripId, TripDataType, TripDayItemType, TripDetailsType, TripHighlightItemType };
