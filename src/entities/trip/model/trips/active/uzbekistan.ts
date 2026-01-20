import type { TripDataType, TripDetailsType } from '../../type.h';
import { TripStatus } from '../../type.h';

const activeTripDataUzbekistan: TripDataType = {
    id: 'uzbekistan-apr-2026-1',
    date: '1–5 апреля',
    background: '/images/trips/active/uzbekistan/promo/promo1.webp',
    destination: 'Узбекистан',
    title: 'Узбекистан: Цветение жизни',
    dateStart: '1 апреля',
    dateEnd: '5 апреля',
    gallery: [
        '/images/trips/active/uzbekistan/promo/promo1.webp',
        '/images/trips/active/uzbekistan/promo/promo2.webp',
        '/images/trips/active/uzbekistan/promo/promo3.webp',
        '/images/trips/active/uzbekistan/promo/promo4.webp',
        '/images/trips/active/uzbekistan/promo/promo5.webp',
        '/images/trips/active/uzbekistan/promo/promo6.webp',
    ],
    priceFrom: 1050,
    currency: 'USD',
    duration: '5',
    locationsCount: 12,
    status: TripStatus.Upcoming,
};

const tripDetailsUzbekistan: TripDetailsType = {
    id: 'uzbekistan-apr-2026-1',
    highlights: [
        {
            title: 'Щедрый и изобильный Узбекистан',
            text: 'Ароматы восточных специй на базарах и изобилие фруктов и ягод весной. Здесь угощают не из вежливости, а от души: лепёшкой, чаем, пловом и сладкими сухофруктами.',
        },
        {
            title: 'Эстетика и восточная сказка',
            text: 'Эстетичные отели 4* с восточным колоритом и европейским комфортом. Каждый город — иллюстрация к восточной сказке, а прогулки — путешествие во времени.',
        },
        {
            title: 'Культурное наследие и тёплый приём',
            text: 'Перекрёсток цивилизаций и следы Великого Шёлкового пути. Живые культурные пространства, наполненные смыслом и историей, и главное наследие — люди и их гостеприимство.',
        },
    ],
    days: [
        {
            title: 'Прибытие в Самарканд',
            activities: [
                'Трансфер в отель, отдых. Встреча с гидом и начало знакомства с регионом.',
                'Шахи‑Зинда, площадь Регистан и комплекс из трёх медресе.',
                'Ужин в ресторане и отдых.',
            ],
            photo: '/images/trips/active/uzbekistan/programm/programm-1.webp',
        },
        {
            title: 'Самарканд',
            activities: [
                'Деревня Конигил: традиции производства самаркандской бумаги из тутового дерева; сделаем свой лист.',
                'Мавзолей Пророка Даниила — место, почитаемое исламом, христианством и иудаизмом.',
                'Базар Сиаб — старейший рынок Самарканда.',
                'Ужин в ресторане и отдых.',
            ],
            photo: '/images/trips/active/uzbekistan/programm/programm-2.webp',
        },
        {
            title: 'Переезд в Бухару',
            activities: [
                'Скоростной поезд (≈1,5 часа) — и мы в Бухаре.',
                'Старый город (ЮНЕСКО): площадь Ляби‑Хауз, комплекс Пои‑Калон, минарет Калян, торговые купола, улочки.',
                'Аутентичная чайная: кофе с кардамоном и чай с сухофруктами.',
                'Ужин в старинном доме еврейского купца XIX века (один из лучших ресторанов города).',
            ],
            photo: '/images/trips/active/uzbekistan/programm/programm-3.webp',
        },
        {
            title: 'Бухара',
            activities: [
                'Завтрак и выезд загород: резиденция последнего бухарского эмира (Ситораи Мохи‑Хоса).',
                'Парк при резиденции: павлины, которых можно покормить с руки.',
                'Мавзолей Бахоуддина Накшбанди — место для молитвы и духовного очищения.',
                'Свободное время для покупок и ужин в ресторане.',
            ],
            photo: '/images/trips/active/uzbekistan/programm/programm-4.webp',
        },
        {
            title: 'Вылет домой',
            activities: [
                'Ланч‑бокс из отеля.',
                'Трансфер в аэропорт и вылет домой.',
            ],
            photo: '/images/trips/active/uzbekistan/programm/programm-5.webp',
        },
    ],
    faq: [
        {
            question: 'Сколько человек в группе?',
            answer: 'В этой поездке формируем группу от 6 человек.',
        },
        {
            question: 'Возможно ли поехать с детьми и от какого возраста?',
            answer: 'Да. Рекомендуем поездку с детьми от 8–10 лет.',
        },
        {
            question: 'В каких отелях планируется проживание?',
            answer: 'Комфортные отели категории 4* (двухместное размещение), завтраки включены (шведский стол).',
        },
        {
            question: 'Как приобретаются авиабилеты?',
            answer: 'Мы находим самые удобные и выгодные рейсы и рекомендуем их для приобретения.',
        },
        {
            question: 'Как будет организовано питание?',
            answer: 'Завтраки включены. На обед и ужин мы забронируем для группы самые аутентичные и колоритные рестораны.',
        },
    ],
};

export {
    activeTripDataUzbekistan,
    tripDetailsUzbekistan,
};
