import type { TripDataType, TripDetailsType } from '../../type.h';

const inactiveTripDataKamchatka: TripDataType = {
    id: 'kamchatka-aug-1',
    isActive: false,
    date: '16 августа',
    background: '/images/trips/previous/kamchatka_1/promo/promo1.webp',
    destination: 'Камчатка',
    title: 'Камчатка. Туда, где живут вулканы',
    dateStart: '16 августа',
    dateEnd: '24 августа',
    gallery: [
        '/images/trips/previous/kamchatka_1/promo/promo1.webp',
        '/images/trips/previous/kamchatka_1/promo/promo2.webp',
        '/images/trips/previous/kamchatka_1/promo/promo3.webp',
        '/images/trips/previous/kamchatka_1/promo/promo4.webp',
        '/images/trips/previous/kamchatka_1/promo/promo5.webp',
        '/images/trips/previous/kamchatka_1/promo/promo6.webp',
    ],
    priceFrom: 220000,
    currency: 'RUB',
    locationsCount: 22,
    status: 'past',
};

const tripDetailsKamchatka: TripDetailsType = {
    id: 'kamchatka-aug-1',
    highlights: [
        {
            title: 'Увидеть Камчатку во всей мощи',
            text: 'Панорамы вулканов, морская прогулка и закат на черном песке Халактырского пляжа — природа, от которой захватывает дух',
        },
        {
            title: 'Ощутить дыхание океана',
            text: 'Касатки, киты и нерпы, речная рыбалка и ароматная уха на берегу — настоящее приключение для любителей моря и дикой природы',
        },
        {
            title: 'Отдыхать с душой и комфортом',
            text: 'Глемпинг у океана, горячие источники и банька с чаном, уютные дома и вкуснейшие морепродукты — всё для полного расслабления',
        },
    ],
    days: [
        {
            title: 'Прилёт и заселение на Халактырском пляже',
            activities: [
                'Welcome‑сет у знака «Здесь начинается Россия».',
                'Остановка на рынке за локальными деликатесами.',
                'Переезд (~1 час) в глемпинг на берегу Тихого океана, размещение и ужин.',
                'Привыкаем к часовому поясу (+9 к Москве).',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo1.webp',
        },
        {
            title: 'Свободный день у океана и баня',
            activities: [
                'Завтрак, отдых на вулканическом пляже.',
                'Опционально — уроки серфинга и утренние практики.',
                'Вечером — банька с тёплым чаном и ужин.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo2.webp',
        },
        {
            title: 'Авачинский перевал и экструзия Верблюд',
            activities: [
                'Выезд к Авачинскому перевалу по руслу сухой реки.',
                'Трек к экструзии Верблюд (~7 км) между вулканами Авачинский и Корякский.',
                'Перекус на высоте, встреча с еврашками.',
                'Термальные источники «Озерки»; переезд и заселение с видом на вулканы.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo3.webp',
        },
        {
            title: 'Морская прогулка: «Три брата», рыбалка и Вулканариум',
            activities: [
                'Ранний выход в море (до 10 часов): скалы Три брата, наблюдение касаток, китов и нерп.',
                'На обед — уха и крабы; возвращение в порт.',
                'Прогулка по центру и визит в Вулканариум.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo4.webp',
        },
        {
            title: 'Трек к Вачкажцу: озёра, «цирк» и водопад',
            activities: [
                'Переезд к массиву Вачкажец (~70 км).',
                'Пеший маршрут ~16 км: озеро Тахколоч, природный «цирк» и водопад.',
                'Возвращение к машине, ужин и термальные источники.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo5.webp',
        },
        {
            title: 'Рафтинг и Малкинские горячие источники',
            activities: [
                'Утренний переезд на старт сплава (2,5–3 часа), «сакачинские» пирожки.',
                'Рафтинг с обедом‑ухой и наблюдением за медведями.',
                'Переезд на дикие Малкинские источники, вечером — возврат в город.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo6.webp',
        },
        {
            title: 'Дачные источники, Вилючинский перевал и плато Горелого',
            activities: [
                'Ранний выезд к Дачным источникам через Вилючинский перевал (~900 м).',
                'Кальдера Горелого, Мутновская метеостанция, фумарольные площадки.',
                'Завершаем у водопада «Спокойный», ужин в городе.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo1.webp',
        },
        {
            title: 'Свободный день и опции (вертолёт, центр, бухты)',
            activities: [
                'Прогулки по Петропавловску: Никольская сопка, батарея Максутова, бухта.',
                'По погоде — вертолётная прогулка.',
                'Вечером — гастрожужин в «Нерка — рыба красная».',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo2.webp',
        },
        {
            title: 'Сувениры и вылет',
            activities: [
                'Завтрак и чек‑аут.',
                'Этнопрограмма по желанию, покупки морепродуктов и сувениров.',
                'Трансфер в аэропорт и вылет домой — Камчатка остаётся в сердце.',
            ],
            photo: '/images/trips/previous/kamchatka_1/promo/promo3.webp',
        },
    ],
};

export {
    inactiveTripDataKamchatka, tripDetailsKamchatka,
};
