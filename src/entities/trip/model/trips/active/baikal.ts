import type { TripDataType, TripDetailsType } from '../../type.h';
import { TripStatus } from '../../type.h';

const activeTripDataBaikal: TripDataType = {
    id: 'baikal-feb-1',
    date: '19–23 февраля',
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
    duration: '5',
    locationsCount: 8,
    status: TripStatus.Upcoming,
};

const tripDetailsBaikal: TripDetailsType = {
    id: 'baikal-feb-1',
    highlights: [
        {
            title: 'Открыть для себя самый большой и красивый природный каток России',
            text: 'Катание на коньках по кристальному Байкалу, прогулки по ледяной глади над 120‑метровой глубиной и поле тюльпанов на льду.',
        },
        {
            title: 'Прочувствовать Байкал как место силы и особой эстетики',
            text: 'Наполнение энергией в местах силы и прогулка по прототипу полярной станции «Боро‑Боро».',
        },
        {
            title: 'Попробовать новые вкусы',
            text: 'Национальная кухня, сибирский деликатес — расколотка, блюда авторской кухни на льду Байкала.',
        },
    ],
    days: [
        {
            title: 'Прибытие в Иркутск',
            activities: [
                'Горячий завтрак, прогулка по Иркутску и дорога на остров Ольхон.',
            ],
            photo: '/images/trips/active/baikal/promo/promo1.webp',
        },
        {
            title: 'Знакомство с Байкалом',
            activities: [
                'Поездка по южной части Байкала на УАЗах: увидим голубой лёд и пузырьки.',
                'Остановки на мысах Шаманка и Бурхан.',
                'Вечером — баня и горячий чан.',
            ],
            photo: '/images/trips/active/baikal/promo/promo2.webp',
        },
        {
            title: 'Дыхание Байкала и его эстетика',
            activities: [
                'Побываем на северной точке — мысе Хобой.',
                'На обед приедем на прототип полярной станции «Боро‑Боро»: авторская кухня.',
            ],
            photo: '/images/trips/active/baikal/promo/promo3.webp',
        },
        {
            title: 'Переезд с о. Ольхон в Иркутск',
            activities: [
                'Дорога в Иркутск.',
                'Посещение галереи современного искусства и Дома‑музея Волконских.',
                'Заключительный ужин в эстетичном ресторане в центре города.',
            ],
            photo: '/images/trips/active/baikal/promo/promo4.webp',
        },
        {
            title: 'Прощание с Байкалом',
            activities: [
                'Трансфер в аэропорт и вылет домой.',
            ],
            photo: '/images/trips/active/baikal/promo/promo5.webp',
        },
    ],
    faq: [
        {
            question: 'Какой размер группы?',
            answer: 'В наших путешествиях, как правило, 8–10 человек.',
        },
        {
            question: 'Какая в это время погода на Байкале?',
            answer: 'Каждый год по‑разному, но для ориентира от −10 до −20 градусов. Холод ощущается легче — ещё никто не замерзал.',
        },
        {
            question: 'На чём мы будем передвигаться в поездке?',
            answer: 'Сначала на микроавтобусе Mercedes Sprinter, на Ольхоне — на «буханках». Также покатаемся на хивусах (судно на воздушной подушке).',
        },
        {
            question: 'Что входит в стоимость путешествия?',
            answer: 'Проживание, транспортное сопровождение, работа гида и координатора, завтраки и обеды, входные билеты, баня, посещение «Боро‑Боро».',
        },
        {
            question: 'Что мне нужно взять с собой?',
            answer: 'Перед каждой поездкой мы заранее готовим подробный список рекомендуемой одежды и аксессуаров.',
        },
        {
            question: 'Какие рейсы мне выбрать?',
            answer: 'Мы подбираем самые удачные (по цене/времени/авиакомпании) рейсы и рекомендуем вам их приобрести.',
        },
    ],
};

export {
    activeTripDataBaikal, tripDetailsBaikal,
};
