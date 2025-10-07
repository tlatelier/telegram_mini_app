import type { TripDataType, TripDetailsType } from "../../type.h";

const inactiveTripData_uar: TripDataType = {
    id: "uar-mar-1",
    isActive: false,
    date: "11 марта",
    background: "images/trips/previous/uar_1/promo/promo1.webp",
    destination: "Кейптаун",
    title: "Кейптаун. Начало",
    dateStart: "11 марта",
    dateEnd: "22 марта",
    gallery: [
        "images/trips/previous/uar_1/promo/promo1.webp",
        "images/trips/previous/uar_1/promo/promo2.webp",
        "images/trips/previous/uar_1/promo/promo3.webp",
        "images/trips/previous/uar_1/promo/promo4.webp",
        "images/trips/previous/uar_1/promo/promo5.webp",
        "images/trips/previous/uar_1/promo/promo6.webp",
    ],
    priceFrom: 3670,
    currency: "USD",
    locationsCount: 18,
};

const tripDetails_uar: TripDetailsType = {
    id: "uar-mar-1",
    highlights: [
        {
            title: "Влюбиться в Кейптаун",
            text: "Современный город у подножия Столовой горы, виды на океан, рассветы и закаты, которые невозможно забыть",
        },
        {
            title: "Открыть дух Африки",
            text: "Яркая культура, удивительный мир флоры и фауны, встречи с природой, не похожей ни на что другое",
        },
        {
            title: "Насладиться вкусами Юга",
            text: "Дегустация вин, свежие морепродукты и блюда африканской кухни, отдых в отелях 4* и душевная атмосфера маленькой группы",
        },
    ],
    days: [
        {
            title: "Кейптаун: прибытие и круиз на закате",
            activities: [
                "Трансфер и размещение в отеле.",
                "Вечерний круиз по Атлантике на закате.",
                "Приветственный ужин в африканском стиле с барабанами.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo1.webp",
        },
        {
            title: "Кейптаун: Столовая гора, Кирстенбош и вертолёт",
            activities: [
                "Подъём на Столовую гору — вид на бухту и «12 апостолов».",
                "Прогулка по ботаническому саду Кирстенбош (ЮНЕСКО).",
                "Вертолётная прогулка над городом и побережьем.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo2.webp",
        },
        {
            title: "Мыс Доброй Надежды и пингвины",
            activities: [
                "Поездка к мысу Доброй Надежды и мысу Кейп Поинт.",
                "Пляж Боулдерс‑Бич с колонией африканских пингвинов.",
                "Встреча с морскими котиками.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo3.webp",
        },
        {
            title: "Мыс Игольный — встреча океанов",
            activities: [
                "Переезд к самой южной точке Африки — мысу Игольному.",
                "Прогулка к маяку и видовые точки, где сходятся Атлантический и Индийский океаны.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo4.webp",
        },
        {
            title: "Переезд в Найзну и устрицы на закате",
            activities: [
                "Трансфер в Найзну: лагуна, яхты и свежайшие устрицы.",
                "Круиз по лагуне на закате с дегустацией.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo5.webp",
        },
        {
            title: "Найзна: обзор и океанские жители",
            activities: [
                "Обзорные виды Найзны: Ватерфронт и панорамы лагуны.",
                "Морская прогулка в поисках китов и дельфинов (по сезону).",
            ],
            photo: "images/trips/previous/uar_1/promo/promo6.webp",
        },
        {
            title: "Тситсикама и устье Стормс‑Ривер",
            activities: [
                "Нацпарк Тситсикама: подвесные тропы среди скалистых берегов.",
                "Прогулка к устью Стормс‑Ривер; по желанию — каякинг по каньону.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo1.webp",
        },
        {
            title: "Сафари: частный заповедник (день 1)",
            activities: [
                "Переезд в частный заповедник у хребта Лангеберг.",
                "Вечернее сафари: представители «Большой пятёрки», африканский ужин у костра (бома).",
            ],
            photo: "images/trips/previous/uar_1/promo/promo2.webp",
        },
        {
            title: "Сафари: частный заповедник (день 2)",
            activities: [
                "Утренние и вечерние выезды с рейнджерами.",
                "Львы, слоны, буйволы, носороги, леопарды, антилопы и птицы Капа.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo3.webp",
        },
        {
            title: "Франшхук — винная долина",
            activities: [
                "Трансфер в Франшхук («французский уголок»).",
                "Прогулка по городу, отдых в отеле, рестораны и бутиковые лавки.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo4.webp",
        },
        {
            title: "Вина Кейпа: дегустации и терруары",
            activities: [
                "Экскурсия по хозяйствам долины: Пинотаж, Вионье и другие сорта региона.",
                "Дегустации, истории виноделия Кейпа и виды на виноградники.",
            ],
            photo: "images/trips/previous/uar_1/promo/promo5.webp",
        },
        {
            title: "Вылет домой",
            activities: [
                "Трансфер в аэропорт к вашему рейсу и вылет домой.",
                "До новых встреч в ЮАР!",
            ],
            photo: "images/trips/previous/uar_1/promo/promo6.webp",
        },
    ],
};

export { inactiveTripData_uar, tripDetails_uar };
