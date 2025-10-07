import type { TripDataType, TripDetailsType } from "../../type.h";

const inactiveTripData_altai: TripDataType = {
    id: "altai-jan-1",
    isActive: false,
    date: "3 января",
    background: "images/trips/previous/altai_1/promo/promo1.webp",
    destination: "Алтай",
    title: "Алтай. Новогодняя зимняя сказка",
    dateStart: "3 января",
    dateEnd: "8 января",
    gallery: [
        "images/trips/previous/altai_1/promo/promo1.webp",
        "images/trips/previous/altai_1/promo/promo2.webp",
        "images/trips/previous/altai_1/promo/promo3.webp",
        "images/trips/previous/altai_1/promo/promo4.webp",
        "images/trips/previous/altai_1/promo/promo5.webp",
        "images/trips/previous/altai_1/promo/promo6.webp",
    ],
    priceFrom: 180000,
    currency: "RUB",
    locationsCount: 16,
};

const tripDetails_altai: TripDetailsType = {
    id: "altai-jan-1",
    highlights: [
        {
            title: "Увидеть волшебство зимнего Алтая",
            text: "Незамерзающие Голубые озёра, прогулки по заснеженным тропам и встреча с зубрами в заповедных уголках",
        },
        {
            title: "Почувствовать тепло Алтая",
            text: "Обнимашки с хаски, катание на снегоходах и душевные вечера с горячим чаем и какао в тёплой компании",
        },
        {
            title: "Насладиться вкусами и уютом",
            text: "Национальная кухня, фермерские продукты и уютные ресторанчики, проживание в комфортных номерах и камерная атмосфера",
        },
    ],
    days: [
        {
            title: "Прилёт и Манжерок: вид с Малой Синюхи",
            activities: [
                "Встреча в аэропорту Горно‑Алтайска и переезд на курорт «Манжерок».",
                "Подъём на смотровую горы Малая Синюха: панорамы долины Катуни и хребтов.",
                "Заселение, ужин и релакс в открытом тёплом бассейне среди сосен.",
            ],
            photo: "images/trips/previous/altai_1/promo/promo1.webp",
        },
        {
            title: "Голубые озёра Катуни и ущелье Горных Духов",
            activities: [
                "Прогулка к бирюзовым Голубым озёрам Катуни по зимнему сосновому лесу.",
                "Обед и лёгкий трек по ущелью Горных Духов с подъёмом на видовую точку.",
            ],
            photo: "images/trips/previous/altai_1/promo/promo2.webp",
        },
        {
            title: "Горно‑Алтайск: Эл‑музей и этно‑аил",
            activities: [
                "Посещение Эл‑музея: природа и культура Алтая, экспозиции Плато Укок.",
                "Этно‑аил: дегустация продуктов и мастер‑класс по созданию оберега.",
                "Ужин и отдых.",
            ],
            photo: "images/trips/previous/altai_1/promo/promo3.webp",
        },
        {
            title: "Катание в Манжероке и снегоходы",
            activities: [
                "Свободное утро или катание на курорте «Манжерок».",
                "После обеда — снегоходный заезд по сопкам.",
                "Вечерняя баня и рождественский ужин.",
            ],
            photo: "images/trips/previous/altai_1/promo/promo4.webp",
        },
        {
            title: "Зубропитомник и хаски‑парк",
            activities: [
                "Зубропитомник, затем хаски‑парк: общение с собаками и кормление оленей.",
                "Обед в «Лампе», возвращение в отель и свободное время.",
            ],
            photo: "images/trips/previous/altai_1/promo/promo5.webp",
        },
        {
            title: "Завтрак, выезд и перелёт",
            activities: [
                "Неспешный завтрак и чек‑аут.",
                "Трансфер в аэропорт Горно‑Алтайска (≈1 час) и вылет домой.",
            ],
            photo: "images/trips/previous/altai_1/promo/promo6.webp",
        },
    ],
};

export { inactiveTripData_altai, tripDetails_altai };
