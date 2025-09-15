type TripId = string;

type TripDataType = {
    id: TripId;
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
};

type TripDayItemType = {
    title: string;
    description: string;
    photo?: string;
};

type TripDetailsType = {
    id: TripId;
    days: TripDayItemType[];
};

export type {
    TripId,
    TripDataType,
    TripDayItemType,
    TripDetailsType,
};