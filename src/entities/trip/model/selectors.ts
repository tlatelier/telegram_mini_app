import type {
    TripId,
    TripDataType,
    TripFAQItemType,
    TripDayItemType,
    TripDetailsType,
    TripFinalOfferType,
    TripExtraSectionType,
    TripHighlightItemType,
} from './type.h';
import {
    tripDetails,
    activeTripData,
    inactiveTripData,
} from './index';

// Общие хелперы
const selectAllActiveTrips = (): TripDataType[] => activeTripData;
const selectAllInactiveTrips = (): TripDataType[] => inactiveTripData;
const selectAllTrips = (): TripDataType[] => [...activeTripData, ...inactiveTripData];

const selectTripDataById = (id: TripId): TripDataType | undefined => {
    return (
        activeTripData.find((trip) => trip.id === id) ??
        inactiveTripData.find((trip) => trip.id === id)
    );
};

const selectTripDetailsById = (id: TripId): TripDetailsType | undefined => {
    return tripDetails.find((details) => details.id === id);
};

// Селекторы TripDataType
const selectTripTitle = (trip: TripDataType): string | undefined => trip?.title;
const selectTripDestination = (trip: TripDataType): string | undefined => trip?.destination;
const selectTripDate = (trip: TripDataType): string | undefined => trip?.date;
const selectTripDateStart = (trip: TripDataType): string | undefined => trip?.dateStart;
const selectTripDateEnd = (trip: TripDataType): string | undefined => trip?.dateEnd;
const selectTripGallery = (trip: TripDataType): string[] | undefined => trip?.gallery;
const selectTripPriceFrom = (trip: TripDataType): number | undefined => trip?.priceFrom;
const selectTripCurrency = (trip: TripDataType): string | undefined => trip?.currency;
const selectTripLocationsCount = (trip: TripDataType): number | undefined => trip?.locationsCount;
const selectTripStatus = (trip: TripDataType): TripDataType['status'] | undefined => trip?.status;
const selectTripDuration = (trip: TripDataType): string | undefined => trip?.duration;
const selectTripBackground = (trip: TripDataType): string | undefined => trip?.background;

// Селекторы TripDetailsType
const selectTripDays = (details: TripDetailsType): TripDayItemType[] | undefined => details?.days;
const selectTripHighlights = (details: TripDetailsType): TripHighlightItemType[] | undefined => details?.highlights;
const selectTripFaq = (details: TripDetailsType): TripFAQItemType[] | undefined => details?.faq;
const selectTripExtras = (details: TripDetailsType): TripExtraSectionType[] | undefined => details?.extras;
const selectTripFinalOffer = (details: TripDetailsType): TripFinalOfferType | undefined => details?.finalOffer;

export {
    // Общие хелперы
    selectAllTrips,
    selectTripDataById,
    selectAllActiveTrips,
    selectTripDetailsById,
    selectAllInactiveTrips,
    // Селекторы TripDataType
    selectTripDate,
    selectTripTitle,
    selectTripStatus,
    selectTripDateEnd,
    selectTripGallery,
    selectTripCurrency,
    selectTripDuration,
    selectTripPriceFrom,
    selectTripDateStart,
    selectTripBackground,
    selectTripDestination,
    selectTripLocationsCount,
    // Селекторы TripDetailsType
    selectTripFaq,
    selectTripDays,
    selectTripExtras,
    selectTripHighlights,
    selectTripFinalOffer,
};


