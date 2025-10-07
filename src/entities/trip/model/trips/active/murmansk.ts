import type { TripDataType, TripDetailsType } from "../../type.h";

const activeTripData_murmansk_active: TripDataType = {
    id: "murmanks-jun-1",
    isActive: true,
    date: "11 июня",
    background: "images/trips/active/murmansk/promo/promo1.webp",
    destination: "Мурманск",
    title: "Арктическое сафари: путешествие к китам",
    dateStart: "11 июня",
    dateEnd: "16 июня",
    gallery: [
        "images/trips/active/murmansk/promo/promo1.webp",
        "images/trips/active/murmansk/promo/promo2.webp",
        "images/trips/active/murmansk/promo/promo3.webp",
        "images/trips/active/murmansk/promo/promo4.webp",
        "images/trips/active/murmansk/promo/promo5.webp",
        "images/trips/active/murmansk/promo/promo6.webp",
    ],
    priceFrom: 130000,
    currency: "RUB",
    locationsCount: 8,
    status: "wip",
};

const tripDetails_murmansk_active: TripDetailsType = {
    id: "murmanks-jun-1",
    highlights: [
        {
            title: "Исследовать Север и океан",
            text: "Морская прогулка по просторам Баренцева моря, встреча с китами и знакомство с дикой природой Кольского полуострова",
        },
        {
            title: "Наслаждаться вкусами Севера",
            text: "Ужин из свежайших морепродуктов, мастер-класс от шефа по приготовлению гребешка и уютные гастроужины на базе отдыха",
        },
        {
            title: "Отдыхать активно и с комфортом",
            text: "Джиппинг по Рыбачьему полуострову, русская баня, комфортные дома и дружеская атмосфера в маленькой группе путешественников",
        },
    ],
    days: [
        {
            title: "Прибытие в Мурманск и размещение на базе",
            activities: [
                "Прилёт из Москвы в Мурманск (прямой рейс, ~2,5 часа).",
                "Встреча и трансфер; по пути любуемся северной природой и водопадами.",
                "Размещение на базе отдыха на берегу моря и реки Титовки, обед с локальными деликатесами.",
                "Вечером — гастроужин с мастер‑классом: готовим гребешка и морского ежа.",
            ],
            photo: "images/trips/active/murmansk/promo/promo1.webp",
        },
        {
            title: "Мотовский залив и морская прогулка за китами",
            activities: [
                "Завтрак на базе.",
                "Морская прогулка по Ледовитому океану (до 7 часов): Мотовский залив, водопады, наблюдение китов и белух.",
                "Вечером — ужин с морепродуктами и баня.",
            ],
            photo: "images/trips/active/murmansk/promo/promo2.webp",
        },
        {
            title: "Полуостров Средний — полуостров Рыбачий — мыс Немецкий",
            activities: [
                "Завтрак.",
                "Переход на катере к полуострову Средний, далее джип‑экспедиция на полуостров Рыбачий и к мысу Немецкий.",
                "Суровые ландшафты Арктики: водопады, реки, хребты, скалы и места боевой славы.",
            ],
            photo: "images/trips/active/murmansk/promo/promo3.webp",
        },
        {
            title: "Свободный день и вылет",
            activities: [
                "Завтрак и свободное время: снорклинг с китами, рыбалка, дайвинг/фридайвинг, треккинги.",
                "Рыбалка в открытом Баренцевом море: треска, палтус или зубатка.",
                "Вечером — ужин с морепродуктами, выселение и трансфер в аэропорт.",
            ],
            photo: "images/trips/active/murmansk/promo/promo4.webp",
        },
    ],
};

export { activeTripData_murmansk_active, tripDetails_murmansk_active };
