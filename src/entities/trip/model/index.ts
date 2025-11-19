import type { TripDataType, TripDetailsType } from './type.h';

import { activeTripDataArgentina, tripDetailsArgentina } from './trips/active/argentina';
import { activeTripDataBaikal, tripDetailsBaikal } from './trips/active/baikal';
import {
    activeTripDataMurmanskActive,
    tripDetailsMurmanskActive,
} from './trips/active/murmansk';

import { inactiveTripDataKamchatka, tripDetailsKamchatka } from './trips/previous/kamchatka';
import {
    inactiveTripDataMurmanskPrev,
    tripDetailsMurmanskPrev,
} from './trips/previous/murmansk';
import { inactiveTripDataAltai, tripDetailsAltai } from './trips/previous/altai';
import { inactiveTripDataJapan, tripDetailsJapan } from './trips/previous/japan';
import { inactiveTripDataUar, tripDetailsUar } from './trips/previous/uar';

const activeTripData: TripDataType[] = [activeTripDataArgentina, activeTripDataBaikal, activeTripDataMurmanskActive];

const inactiveTripData: TripDataType[] = [
    inactiveTripDataKamchatka,
    inactiveTripDataMurmanskPrev,
    inactiveTripDataAltai,
    inactiveTripDataJapan,
    inactiveTripDataUar,
];

const tripDetails: TripDetailsType[] = [
    tripDetailsArgentina,
    tripDetailsBaikal,
    tripDetailsMurmanskActive,
    tripDetailsKamchatka,
    tripDetailsMurmanskPrev,
    tripDetailsAltai,
    tripDetailsJapan,
    tripDetailsUar,
];

export {
    activeTripData, inactiveTripData, tripDetails,
};
