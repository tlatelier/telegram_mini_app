import type { TripDataType, TripDetailsType } from '../../type.h';
import { TripStatus } from '../../type.h';

const activeTripDataSouthAfrica: TripDataType = {
    id: 'south-africa-mar-2026-1',
    date: '3–16 марта',
    background: '/images/trips/active/south-africa/promo/promo1.webp',
    destination: 'Южная Африка',
    title: 'На край Земли в Южную Африку',
    dateStart: '3 марта',
    dateEnd: '16 марта',
    gallery: [
        '/images/trips/active/south-africa/promo/promo1.webp',
        '/images/trips/active/south-africa/promo/promo2.webp',
        '/images/trips/active/south-africa/promo/promo3.webp',
        '/images/trips/active/south-africa/promo/promo4.webp',
        '/images/trips/active/south-africa/promo/promo5.webp',
        '/images/trips/active/south-africa/promo/promo6.webp',
    ],
    priceFrom: 5200,
    currency: 'USD',
    duration: '14',
    locationsCount: 16,
    status: TripStatus.Upcoming,
};

const tripDetailsSouthAfrica: TripDetailsType = {
    id: 'south-africa-mar-2026-1',
    highlights: [
        {
            title: 'Южная Африка — путешествие на край Земли',
            text: 'ЮАР — на самом юге Африканского континента, там, где встречаются Индийский и Атлантический океаны. Впереди — только льды Антарктиды.',
        },
        {
            title: 'Дикая природа: увидеть большую африканскую пятёрку на сафари',
            text: 'Здесь вы увидите диких зверей в естественной среде обитания безопасно и в сопровождении опытных рейнджеров — шанс оказаться лицом к лицу с настоящей Африкой.',
        },
        {
            title: 'Гедонизм в высочайшей степени',
            text: 'Органически чистые продукты: свежие стейки, океаническая рыба и морепродукты, фрукты с местных ферм, вкуснейшие вина и шампанское (MCC) на известных винодельнях.',
        },
    ],
    days: [
        {
            title: 'Перелёт в Кейптаун',
            activities: [
                'Вылет из России с пересадкой, прибытие в Кейптаун.',
                'Встреча в аэропорту и трансфер в отель.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-1.webp',
        },
        {
            title: 'Добро пожаловать в Кейптаун',
            activities: [
                'Встреча в аэропорту, трансфер в отель и знакомство с городом.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-2.webp',
        },
        {
            title: 'Мыс Доброй Надежды (Cape of Good Hope)',
            activities: [
                'Капский полуостров и дорога Chapman’s Peak Drive.',
                'Бухта Hout Bay: морские котики.',
                'Прогулка у Мыса Доброй Надежды.',
                'Boulders Beach: знакомство с пингвинами.',
                'Обед с видом на океан и возвращение в город.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-2.webp',
        },
        {
            title: 'Столовая гора (Кейптаун)',
            activities: [
                'Вертолётная прогулка.',
                'Центр города и квартал Bo‑Kaap.',
                'Подъём на Столовую гору — панорама Кейптауна.',
                'Посещение старейших винных ферм региона Констанция.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-3.webp',
        },
        {
            title: 'Кейптаун (свободный день)',
            activities: [
                'Свободное время для отдыха, шоппинга или прогулок.',
                'Вечером — морской круиз на закате.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-4.webp',
        },
        {
            title: 'Город Херманус',
            activities: [
                'Поездка в «столицу китов».',
                'По пути — частная ферма со спасёнными гепардами и другими животными.',
                'Размещение в отеле в Херманусе.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-5.webp',
        },
        {
            title: 'Мыс Игольный',
            activities: [
                'Прогулка на самую южную точку Африканского континента.',
                'Место с сильной энергетикой и «идеальным» компасом (без магнитного отклонения).',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-7.webp',
        },
        {
            title: 'Франчхук (винный регион)',
            activities: [
                'Переезд в винный регион.',
                'Остановка на ферме с видами на океан: винное сафари.',
                'Посещение лучших виноделен региона.',
                'Размещение в отеле и отдых.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-8.webp',
        },
        {
            title: 'Франчхук (свободный день)',
            activities: [
                'День для отдыха и расслабления.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-9.webp',
        },
        {
            title: 'Перелёт на водопад Виктория',
            activities: [
                'Переезд в аэропорт Кейптауна и вылет в Зимбабве.',
                'Экскурсия на водопад со стороны Зимбабве.',
                'Переезд в отель и размещение.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-10.webp',
        },
        {
            title: 'Водопад Виктория',
            activities: [
                'Прогулка к водопаду со стороны Замбии (отель рядом с нацпарком).',
                'Во второй половине дня — круиз по реке Замбези на закате.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-11.webp',
        },
        {
            title: 'Парк Чобе, Ботсвана',
            activities: [
                'Поездка в соседний регион Ботсвана.',
                'Сафари в национальном парке Чобе (слоны, хищники, антилопы; бегемоты и крокодилы в реке).',
                'Наблюдение за животными на суше и по реке, обед, возвращение в отель.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-12.webp',
        },
        {
            title: 'Перелёт в Йоханнесбург',
            activities: [
                'Завершение путешествия: переезд в аэропорт и вылет в Йоханнесбург.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-13.webp',
        },
        {
            title: 'Международный перелёт домой',
            activities: [
                'Пересадка в Йоханнесбурге и международный перелёт домой.',
                'Прибытие в Россию.',
            ],
            photo: '/images/trips/active/south-africa/programm/programm-14.webp',
        },
    ],
    faq: [
        {
            question: 'Нужна ли виза в Южную Африку и другие регионы в путешествии?',
            answer: 'В Южную Африку виза не нужна, однако виза в Замбии и Зимбабве требуется: ставится в аэропорту по прилёту и оплачивается на месте (50$).',
        },
        {
            question: 'Как мне долететь до ЮАР?',
            answer: 'Из России можно долететь с 1 короткой пересадкой (Qatar Airways, Emirates, Turkish Airlines). Мы подберём самые удобные и выгодные рейсы.',
        },
        {
            question: 'Что входит в стоимость путешествия?',
            answer: 'Проживание в отелях 4* (двухместное размещение), транспортное сопровождение, гид, круиз на закате в Кейптауне, вертолётная прогулка (20 мин), винное сафари, посещение фермы гепардов, круиз на закате по Замбези, экскурсия на водопад Виктория, поездка на целый день в Ботсвану и сафари с обедом (англоговорящий гид и рейнджер), менеджер на связи 24/7.',
        },
        {
            question: 'Что необходимо оплачивать дополнительно?',
            answer: 'Международный и внутренние авиаперелёты, обеды и ужины, медстраховка, винные дегустации, чаевые гиду и водителю, виза в Замбии и Зимбабве.',
        },
        {
            question: 'Насколько безопасно в этих регионах?',
            answer: 'Всё безопасно: группу сопровождают местные гид и водитель, маршрут проложен без неблагоприятных районов. Также на связи менеджер компании.',
        },
    ],
};

export {
    activeTripDataSouthAfrica,
    tripDetailsSouthAfrica,
};
