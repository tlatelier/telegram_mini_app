import type { TripDataType, TripDetailsType } from './type.h';

import {
    tripDetailsBaikal,
    activeTripDataBaikal,
} from './trips/active/baikal';
import {
    tripDetailsMurmanskActive,
    activeTripDataMurmanskActive,
} from './trips/active/murmansk';
import {
    tripDetailsQatarWinter,
    activeTripDataQatarWinter,
} from './trips/active/qatar';
import {
    tripDetailsSouthAfrica,
    activeTripDataSouthAfrica,
} from './trips/active/south-africa';
import {
    tripDetailsUzbekistan,
    activeTripDataUzbekistan,
} from './trips/active/uzbekistan';

import {
    tripDetailsKamchatka,
    inactiveTripDataKamchatka,
} from './trips/previous/kamchatka';
import {
    tripDetailsMurmanskPrev,
    inactiveTripDataMurmanskPrev,
} from './trips/previous/murmansk';
import {
    tripDetailsAltai,
    inactiveTripDataAltai,
} from './trips/previous/altai';
import {
    tripDetailsJapan,
    inactiveTripDataJapan,
} from './trips/previous/japan';
import {
    tripDetailsUar,
    inactiveTripDataUar,
} from './trips/previous/uar';

const activeTripData: TripDataType[] = [
    activeTripDataSouthAfrica,
    activeTripDataBaikal,
    activeTripDataMurmanskActive,
    activeTripDataQatarWinter,
    activeTripDataUzbekistan,
];

const inactiveTripData: TripDataType[] = [
    inactiveTripDataKamchatka,
    inactiveTripDataMurmanskPrev,
    inactiveTripDataAltai,
    inactiveTripDataJapan,
    inactiveTripDataUar,
];

const tripDetails: TripDetailsType[] = [
    tripDetailsSouthAfrica,
    tripDetailsBaikal,
    tripDetailsMurmanskActive,
    tripDetailsQatarWinter,
    tripDetailsUzbekistan,
    tripDetailsKamchatka,
    tripDetailsMurmanskPrev,
    tripDetailsAltai,
    tripDetailsJapan,
    tripDetailsUar,
];

export {
    tripDetails,
    activeTripData,
    inactiveTripData,
};
