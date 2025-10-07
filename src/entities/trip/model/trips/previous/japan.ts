import type { TripDataType, TripDetailsType } from "../../type.h";

const inactiveTripData_japan: TripDataType = {
    id: "japan-nov-1",
    isActive: false,
    date: "3 ноября",
    background: "images/trips/previous/japan_1/promo/promo1.webp",
    destination: "Япония",
    title: "Япония. Страна контрастов",
    dateStart: "3 ноября",
    dateEnd: "11 ноября",
    gallery: [
        "images/trips/previous/japan_1/promo/promo1.webp",
        "images/trips/previous/japan_1/promo/promo2.webp",
        "images/trips/previous/japan_1/promo/promo3.webp",
        "images/trips/previous/japan_1/promo/promo4.webp",
        "images/trips/previous/japan_1/promo/promo5.webp",
        "images/trips/previous/japan_1/promo/promo6.webp",
    ],
    priceFrom: 3620,
    currency: "USD",
    locationsCount: 17,
};

const tripDetails_japan: TripDetailsType = {
    id: "japan-nov-1",
    highlights: [
        {
            title: "Прикоснуться к древним традициям",
            text: "Синтоистские храмы, исчезающее искусство гейш и жизнь Японии, где вековые ритуалы соседствуют с высокими технологиями",
        },
        {
            title: "Познать вкус настоящей Японии",
            text: "Самые свежие морепродукты, ужин с гейшей и майко, суши, рамен, моти и сукияки — гастрономическое наслаждение без компромиссов",
        },
        {
            title: "Путешествовать с комфортом",
            text: "Проживание в рёканах и отелях 4*, поездки на скоростных поездах и комфортабельных минивенах в уютной камерной группе",
        },
    ],
    days: [
        {
            title: "Токио: прибытие и знакомство",
            activities: [
                "Прилёт в Токио (Нарита/Ханэда), трансфер и размещение в отеле.",
                "Приветственный ужин и вечерняя прогулка по городу.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo1.webp",
        },
        {
            title: "Токио: Асакуса — Гинза — Сибуя — Синдзюку",
            activities: [
                "Асакуса с атмосферой старого города, Гинза с галереями и универмагами.",
                "Сибуя с легендарным перекрёстком и Синдзюку‑Гёэн — зелёный оазис мегаполиса.",
                "Хатико — на удачу.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo2.webp",
        },
        {
            title: "Никко: наследие ЮНЕСКО",
            activities: [
                "Переезд в Никко (≈135 км).",
                "Храмы и святыни комплекса ЮНЕСКО, водопады и холмы нацпарка.",
                "Осенняя кленовая палитра — пауза после шумного Токио.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo3.webp",
        },
        {
            title: "Хаконэ и гора Фудзи",
            activities: [
                "Хаконэ: онсены, виды на Фудзияму и прогулка по озеру.",
                "Фуникулёр к долине Овакудани («Большая кипящая долина»).",
                "Размещение в рёкане со SPA и куро‑тамаго — «чёрные яйца».",
            ],
            photo: "images/trips/previous/japan_1/promo/promo4.webp",
        },
        {
            title: "Киото и Нара",
            activities: [
                "Синкансеном в Киото (≈2,5 ч).",
                "Нара: парк с дружелюбными оленями, храмы и святыни.",
                "Возвращение и размещение в Киото.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo5.webp",
        },
        {
            title: "Киото: золото Кинкаку‑дзи и район гейш Гион",
            activities: [
                "Кинкаку‑дзи — золотой павильон и «открыточный» Киото.",
                "Медитативный сад камней Рёан‑дзи.",
                "Вечером — ужин‑знакомство с искусством гейш в районе Гион.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo6.webp",
        },
        {
            title: "Арасияма или Universal Studios",
            activities: [
                "Бамбуковая роща Арасиямы с мостом Тогэцукё и храмами.",
                "Или Universal Studios в Осаке (≈1 ч на поезде): аттракционы и мир Гарри Поттера.",
                "Заключительный ужин.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo1.webp",
        },
        {
            title: "Вылет из Осаки",
            activities: [
                "Завтрак, выезд и трансфер в аэропорт Осаки.",
                "При вечернем рейсе — шоппинг и обед в городе.",
                "Возможна стыковка с короткой прогулкой по Пекину или Шанхаю.",
            ],
            photo: "images/trips/previous/japan_1/promo/promo2.webp",
        },
    ],
};

export { inactiveTripData_japan, tripDetails_japan };
