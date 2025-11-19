import type { TripDataType, TripDetailsType } from '../../type.h';

const activeTripDataBaikal: TripDataType = {
    id: 'baikal-feb-1',
    isActive: true,
    date: '19 февраля',
    background: '/images/trips/active/baikal/promo/promo1.webp',
    destination: 'Байкал',
    title: 'Лёд Байкала',
    dateStart: '19 февраля',
    dateEnd: '23 февраля',
    gallery: [
        '/images/trips/active/baikal/promo/promo1.webp',
        '/images/trips/active/baikal/promo/promo2.webp',
        '/images/trips/active/baikal/promo/promo3.webp',
        '/images/trips/active/baikal/promo/promo4.webp',
        '/images/trips/active/baikal/promo/promo5.webp',
        '/images/trips/active/baikal/promo/promo6.webp',
    ],
    priceFrom: 154000,
    currency: 'RUB',
    locationsCount: 11,
    status: 'upcoming',
};

const tripDetailsBaikal: TripDetailsType = {
    id: 'baikal-feb-1',
    highlights: [
        {
            title: 'Открывать волшебство льда',
            text: 'Катание на коньках по кристальному Байкалу, прогулки по ледяной глади над 120-метровой глубиной и поле тюльпанов на льду',
        },
        {
            title: 'Наполняться энергией Байкала',
            text: 'Посещение мест силы, душевная баня с видом на озеро и знакомство с культурой прибайкалья — всё для перезагрузки и вдохновения',
        },
        {
            title: 'Наслаждаться вкусами Сибири',
            text: 'Дегустация национальной кухни, свежая расколотка рыбы, ужины в уютной компании и проживание в комфортных номерах',
        },
    ],
    days: [
        {
            title: 'Ночной перелёт в Иркутск',
            activities: [
                'Вылет из Москвы в 21:15 и ночной перелёт в Иркутск (прилёт ~08:10).',
                'Разница во времени с Иркутском: +5 часов к Москве.',
                'Прибытие на следующий день и старт путешествия.',
            ],
            photo: '/images/trips/active/baikal/promo/promo1.webp',
        },
        {
            title: 'Иркутск — этнопарк «Золотая Орда» — Ольхон (Курма)',
            activities: [
                'Встреча в аэропорту, организованный трансфер и горячий завтрак (шведский стол).',
                'Небольшая обзорная прогулка по Иркутску.',
                'Переезд на Ольхон через этнопарк «Золотая Орда» с национальным бурятским обедом.',
                'Прибытие в Курму, пересадка на УАЗы и размещение в отеле (после 20:00).',
            ],
            photo: '/images/trips/active/baikal/promo/promo2.webp',
        },
        {
            title: 'Южный Байкал: голубой лёд, «пузырьки», Шаманка и Бурхан',
            activities: [
                'Поездка на УАЗах по южной части Байкала: голубой лёд и знаменитые «пузырьки».',
                'Остановки у мысов Шаманка и Бурхан, горячий обед.',
                'Вечером — баня и горячая купель; ужин и свободное время.',
            ],
            photo: '/images/trips/active/baikal/promo/promo3.webp',
        },
        {
            title: 'Мыс Хобой, ледовая станция «Боро‑Боро» и хивус',
            activities: [
                'Открываем север Ольхона: могущественный мыс Хобой, гроты и ледовые скульптуры.',
                'На станции «Боро‑Боро» — каток на прозрачном льду, мастер‑класс по расколотке, игры и фото‑зоны.',
                'В завершение — прогулка на хивусе по зеркальному льду на закате.',
            ],
            photo: '/images/trips/active/baikal/promo/promo4.webp',
        },
        {
            title: 'Возвращение в Иркутск: Галерея современного искусства и дом‑музей Волконских',
            activities: [
                'Переезд по зимней дороге с Ольхона в Иркутск.',
                'Обед в ресторане Галереи современного искусства, затем экскурсия в «Дом‑музей Волконских».',
                'Размещение в отеле в центре города, вечер свободен.',
            ],
            photo: '/images/trips/active/baikal/promo/promo5.webp',
        },
        {
            title: 'Иркутск — аэропорт — перелёт в Москву',
            activities: [
                'Неспешный завтрак, организованный трансфер в аэропорт и перелёт домой.',
                'Берём с собой впечатления о прозрачном льде, торосах и сибирском гостеприимстве.',
            ],
            photo: '/images/trips/active/baikal/promo/promo6.webp',
        },
    ],
};

export {
    activeTripDataBaikal, tripDetailsBaikal,
};
