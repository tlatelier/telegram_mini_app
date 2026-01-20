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

// Сортируем поездки вручную по дате начала (от ближайшей к дальней):
// 1. Катар: 4-8 февраля
// 2. Байкал: 19-23 февраля
// 3. Южная Африка: 3-16 марта
// 4. Мурманск: 7-9 марта
// 5. Узбекистан: 1-5 апреля
const activeTripData: TripDataType[] = [
    activeTripDataQatarWinter,      // 4-8 февраля (ближайшая)
    activeTripDataBaikal,           // 19-23 февраля
    activeTripDataSouthAfrica,      // 3-16 марта
    activeTripDataMurmanskActive,   // 7-9 марта
    activeTripDataUzbekistan,       // 1-5 апреля (самая дальняя)
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
