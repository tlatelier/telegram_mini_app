import type { TripDataType, TripDetailsType } from "./type.h";

import { activeTripData_argentina, tripDetails_argentina } from "./trips/active/argentina";
import { activeTripData_baikal, tripDetails_baikal } from "./trips/active/baikal";
import {
    activeTripData_murmansk_active,
    tripDetails_murmansk_active,
} from "./trips/active/murmansk";

import { inactiveTripData_kamchatka, tripDetails_kamchatka } from "./trips/previous/kamchatka";
import {
    inactiveTripData_murmansk_prev,
    tripDetails_murmansk_prev,
} from "./trips/previous/murmansk";
import { inactiveTripData_altai, tripDetails_altai } from "./trips/previous/altai";
import { inactiveTripData_japan, tripDetails_japan } from "./trips/previous/japan";
import { inactiveTripData_uar, tripDetails_uar } from "./trips/previous/uar";

const activeTripData: TripDataType[] = [
    activeTripData_argentina,
    activeTripData_baikal,
    activeTripData_murmansk_active,
];

const inactiveTripData: TripDataType[] = [
    inactiveTripData_kamchatka,
    inactiveTripData_murmansk_prev,
    inactiveTripData_altai,
    inactiveTripData_japan,
    inactiveTripData_uar,
];

const tripDetails: TripDetailsType[] = [
    tripDetails_argentina,
    tripDetails_baikal,
    tripDetails_murmansk_active,
    tripDetails_kamchatka,
    tripDetails_murmansk_prev,
    tripDetails_altai,
    tripDetails_japan,
    tripDetails_uar,
];

export { activeTripData, inactiveTripData, tripDetails };
