import type { TripDataType, TripDetailsType } from '../../type.h';
import { TripStatus } from '../../type.h';

const activeTripDataQatarWinter: TripDataType = {
    id: 'qatar-feb-2026-1',
    date: '4–8 февраля',
    background: '/images/trips/active/qatar/promo/promo1.webp',
    destination: 'Катар',
    title: 'Арт путешествие в Катар',
    dateStart: '4 февраля',
    dateEnd: '8 февраля',
    priceFrom: 2680,
    currency: 'USD',
    duration: '5',
    locationsCount: 7,
    status: TripStatus.Upcoming,
    gallery: [
        '/images/trips/active/qatar/promo/promo1.webp',
        '/images/trips/active/qatar/promo/promo2.webp',
        '/images/trips/active/qatar/promo/promo3.webp',
        '/images/trips/active/qatar/promo/promo4.webp',
        '/images/trips/active/qatar/promo/promo5.webp',
        '/images/trips/active/qatar/promo/promo6.webp',
    ],
};

const tripDetailsQatarWinter: TripDetailsType = {
    id: 'qatar-feb-2026-1',
    highlights: [
        {
            title: 'Глубокое погружение в культуру и современное искусство',
            text: 'Мировая премьера ярмарки современного искусства ART Basel — впервые проходит в Катаре.',
        },
        {
            title: 'Исследование себя через призму современного искусства',
            text: 'Вместе с профессиональным арт‑консультантом и медиатором познакомимся с мировыми арт‑объектами и их смыслами.',
        },
        {
            title: 'Многогранная программа путешествия',
            text: 'Обзорная прогулка по столице с гидом, Национальный музей Катара и Культурная деревня, сафари в пустыне на джипах к внутреннему морю, эстетичные рестораны и звёзды Michelin.',
        },
    ],
    days: [
        {
            title: 'Перелёт в Доху (Катар)',
            activities: [
                'Прибытие в Доху, трансфер в отель, размещение и ужин в ресторане.',
                'Знакомство с участниками путешествия за ужином.',
            ],
            photo: '/images/trips/active/qatar/programm/programm-1.webp',
        },
        {
            title: 'Знакомство с регионом',
            activities: [
                'Завтрак в отеле.',
                'Обзорная прогулка по столице с гидом: восточный рынок, культурная деревня, Национальный музей Катара и арт‑объекты в городе.',
                'Обед в ресторане и свободное время.',
            ],
            photo: '/images/trips/active/qatar/programm/programm-2.webp',
        },
        {
            title: 'Ярмарка современного искусства Art Basel Qatar',
            activities: [
                'Завтрак в отеле.',
                'Посещение ярмарки в сопровождении арт‑консультанта и медиатора.',
                'Обед и обсуждение‑рефлексия по итогам медиации.',
                'Свободное время или посещение музеев / шоппинг.',
            ],
            photo: '/images/trips/active/qatar/programm/programm-3.webp',
        },
        {
            title: 'Сафари в пустыне',
            activities: [
                'Завтрак в отеле, свободное время и отдых у бассейна.',
                'Ранний обед в ресторане.',
                'Выезд на сафари в пустыню на закат, катание на верблюдах.',
                'По желанию: сэндбординг и квадроциклы (за доп. оплату).',
                'Возвращение к вечеру в отель.',
            ],
            photo: '/images/trips/active/qatar/programm/programm-4.webp',
        },
        {
            title: 'Отправление домой',
            activities: [
                'Завтрак в отеле / ланч‑бокс.',
                'Трансфер в аэропорт, вылет в Россию.',
            ],
            photo: '/images/trips/active/qatar/programm/programm-5.webp',
        },
    ],
    faq: [
        {
            question: 'Что включено в стоимость поездки?',
            answer: [
                'Проживание в отеле 5* в улучшенном двухместном номере',
                'Трансфер аэропорт — отель — аэропорт',
                'Входные билеты на ярмарку и в Национальный музей Катара',
                'Медиация и сопровождение арт‑консультантом',
                'Обзорная прогулка по Дохе с гидом',
                'Поездка в пустыню и сафари на джипах на закате',
            ],
        },
        {
            question: 'Как приобретается авиабилет?',
            answer: 'Мы подбираем самые удобные перелёты и рекомендуем вам для самостоятельного приобретения.',
        },
        {
            question: 'Нужна ли виза в Катар?',
            answer: 'Нет, виза в Катар не требуется.',
        },
        {
            question: 'Какие будут расходы на месте?',
            answer: 'Питание (обеды и ужины), дополнительные активности, не включенные в программу.',
        },
        {
            question: 'Какая погода в это время в Катаре?',
            answer: 'В начале февраля комфортная тёплая погода: днём +20/22, ночью +14.',
        },
        {
            question: 'Если я хочу поехать с семьёй и детьми, это возможно?',
            answer: 'Да, конечно. В этом случае мы предложим комфортный формат размещения в отеле и постараемся учесть ваши пожелания.',
        },
    ],
};

export {
    activeTripDataQatarWinter,
    tripDetailsQatarWinter,
};
