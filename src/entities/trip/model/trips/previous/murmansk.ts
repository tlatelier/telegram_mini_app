import type { TripDataType, TripDetailsType } from "../../type.h";

const inactiveTripData_murmansk_prev: TripDataType = {
    id: "murmansk-mar-1",
    isActive: false,
    date: "6 марта",
    background: "images/trips/previous/murmansk_1/promo/promo1.webp",
    destination: "Мурманск",
    title: "Мурманск. Русский Север",
    dateStart: "6 марта",
    dateEnd: "8 марта",
    gallery: [
        "images/trips/previous/murmansk_1/promo/promo1.webp",
        "images/trips/previous/murmansk_1/promo/promo2.webp",
        "images/trips/previous/murmansk_1/promo/promo3.webp",
        "images/trips/previous/murmansk_1/promo/promo4.webp",
        "images/trips/previous/murmansk_1/promo/promo5.webp",
        "images/trips/previous/murmansk_1/promo/promo6.webp",
    ],
    priceFrom: 74000,
    currency: "RUB",
    locationsCount: 11,
};

const tripDetails_murmansk_prev: TripDetailsType = {
    id: "murmansk-mar-1",
    highlights: [
        {
            title: "Поймать магию Севера",
            text: "Охота за Северным Сиянием, знакомство с оленями и хаски, прогулка по зимним просторам за Полярным кругом",
        },
        {
            title: "Ощутить вкус Арктики",
            text: "Свежие морепродукты, мясо оленя и морошковые десерты, ужины в стиле северной кухни и традиционные настойки",
        },
        {
            title: "Отдыхать по-северному",
            text: "Загородный дом в лесу, банька для души и уютная компания единомышленников — тёплое путешествие в холодный край",
        },
    ],
    days: [
        {
            title: "Прилёт, обзорный Мурманск и заселение",
            activities: [
                "Встреча в аэропорту и обед арктической кухни (гребешки, крабы, палтус/треска).",
                "Обзорная прогулка: ледокол «Ленин», Алёша, панорамы и музей морского пароходства.",
                "Заселение в загородный отель, баня и ужин.",
                "Вечером — охота за Северным сиянием при благоприятном прогнозе.",
            ],
            photo: "images/trips/previous/murmansk_1/promo/promo1.webp",
        },
        {
            title: "Териберка: тундра, «Яйца дракона» и море",
            activities: [
                "Завтрак и переезд в Териберку: ветряки и тундра.",
                "Кладбище кораблей, пляж «Яйца дракона», водопад Батарейный и качели.",
                "Обед с видом на Баренцево море; морская прогулка.",
                "Возвращение в отель, ужин и, при прогнозе, охота за Сиянием.",
            ],
            photo: "images/trips/previous/murmansk_1/promo/promo2.webp",
        },
        {
            title: "Снегоходы, хаски‑парк и вылет",
            activities: [
                "Выселение и активный заезд на снегоходах.",
                "Хаски‑парк: общение с хаски и кормление оленей.",
                "Заключительный обед с северными деликатесами, сувениры и трансфер в аэропорт.",
            ],
            photo: "images/trips/previous/murmansk_1/promo/promo3.webp",
        },
    ],
};

export { inactiveTripData_murmansk_prev, tripDetails_murmansk_prev };
