import type { TripDataType, TripDetailsType } from "./type.h";

const activeTripData: TripDataType[] = [
  {
    id: "argentina-dec-1",
    isActive: true,
    date: "25 декабря",
    background: "images/trips/active/argentina/promo/promo1.webp",
    destination: "Аргентина",
    title: "От Буэнос-Айреса до края света",
    dateStart: "25 декабря",
    dateEnd: "10 января",
    gallery: [
      "images/trips/active/argentina/promo/promo1.webp",
      "images/trips/active/argentina/promo/promo2.webp",
      "images/trips/active/argentina/promo/promo3.webp",
      "images/trips/active/argentina/promo/promo4.webp",
      "images/trips/active/argentina/promo/promo5.webp",
    ],
    priceFrom: 6600,
    currency: "USD",
    locationsCount: 24,
  },
  {
    id: "baikal-feb-1",
    isActive: true,
    date: "19 февраля",
    background: "images/trips/active/baikal/promo/promo1.webp",
    destination: "Байкал",
    title: "Лёд Байкала",
    dateStart: "19 февраля",
    dateEnd: "23 февраля",
    gallery: [
      "images/trips/active/baikal/promo/promo1.webp",
      "images/trips/active/baikal/promo/promo2.webp",
      "images/trips/active/baikal/promo/promo3.webp",
      "images/trips/active/baikal/promo/promo4.webp",
      "images/trips/active/baikal/promo/promo5.webp",
      "images/trips/active/baikal/promo/promo6.webp",
    ],
    priceFrom: 154000,
    currency: "RUB",
    locationsCount: 11,
  },
  {
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
  },
];

const inactiveTripData: TripDataType[] = [
  {
    id: "kamchatka-aug-1",
    isActive: false,
    date: "16 августа",
    background: "images/trips/previous/kamchatka_1/promo/promo1.webp",
    destination: "Камчатка",
    title: "Камчатка. Туда, где живут вулканы",
    dateStart: "16 августа",
    dateEnd: "24 августа",
    gallery: [
      "images/trips/previous/kamchatka_1/promo/promo1.webp",
      "images/trips/previous/kamchatka_1/promo/promo2.webp",
      "images/trips/previous/kamchatka_1/promo/promo3.webp",
      "images/trips/previous/kamchatka_1/promo/promo4.webp",
      "images/trips/previous/kamchatka_1/promo/promo5.webp",
      "images/trips/previous/kamchatka_1/promo/promo6.webp",
    ],
    priceFrom: 220000,
    currency: "RUB",
    locationsCount: 22,
  },
  {
    id: "murmansk-mar-1",
    isActive: false,
    date: "6 марта",
    background: "images/trips/previous/murmansk_1/promo/promo1.webp",
    destination: "Мурманск",
    title: "Мурманск. Русский Север",
    dateStart: "6 марта",
    dateEnd: "8 марта",
    gallery: [
      "images/trips/previous/murmansk_1/promo/promo1.webp",
      "images/trips/previous/murmansk_1/promo/promo2.webp",
      "images/trips/previous/murmansk_1/promo/promo3.webp",
      "images/trips/previous/murmansk_1/promo/promo4.webp",
      "images/trips/previous/murmansk_1/promo/promo5.webp",
      "images/trips/previous/murmansk_1/promo/promo6.webp",
    ],
    priceFrom: 74000,
    currency: "RUB",
    locationsCount: 11,
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const tripDetails: TripDetailsType[] = [
  {
    id: "argentina-dec-1",
    days: [
      {
        title: "Перелёт в Аргентину",
        description:
          "Долгий перелёт через Стамбул и Сан-Пауло переносит нас из Москвы в Буэнос-Айрес. Это путешествие — ворота в другой континент, где нас ждёт совсем иной ритм жизни. Перелёт станет первой ступенью к большому приключению.",
          photo: "images/trips/active/argentina/programm/programm1.webp",
      },
      {
        title: "Прилет и первые впечатления",
        description:
          "Прилет в Буэнос-Айрес, индивидуальный трансфер и размещение в отеле. Отдых после долгого перелёта в одном из самых элегантных районов столицы. Вечером — ужин в местном ресторане и первые знакомства с культурой города.",
          photo: "images/trips/active/argentina/programm/programm2.webp",
      },
      {
        title: "Сан-Тельмо и Ла-Бока",
        description:
          "Целый день прогулки по культовым районам Буэнос-Айреса. От аристократического Сан-Тельмо с его антикварными лавками до яркой и фотогеничной Ла-Боки, где зародилось уличное танго. Вечером свободное время для самостоятельных открытий и ужин.",
          photo: "images/trips/active/argentina/programm/programm3.webp",
      },
      {
        title: "Элегантный Буэнос-Айрес",
        description:
          "Мы увидим Реколету с её особняками и кладбище, где покоится Эвита Перон. Нас ждёт прогулка по Палермо с его арт-пространствами и культовый цветок Floralis Genérica. Вечером — ужин с танго-шоу в легендарном Café de los Angelitos.",
          photo: "images/trips/active/argentina/programm/programm4.webp",
      },
      {
        title: "День гаучо на ранчо",
        description:
          "Выезд в пригород Буэнос-Айреса на ранчо El Ombu. Аутентичный день с асадо на углях, шоу с лошадьми и традициями аргентинских ковбоев. После активной программы можно отдохнуть у бассейна или прогуляться вдоль реки Ареко.",
          photo: "images/trips/active/argentina/programm/programm5.webp",
      },
      {
        title: "Путешествие в Патагонию",
        description:
          "Перелёт в Эль-Калафате и обед в местной эстансии. Джип-сафари к горе Фриас подарит панорамы озера Аргентино, Анд и легендарного Фиц-Роя. Вечером — ужин и отдых в отеле с видом на патагонские пейзажи.",
          photo: "images/trips/active/argentina/programm/programm6.webp",
      },
      {
        title: "Ледовое сафари",
        description:
          "Целый день путешествия по озеру Аргентино к ледникам Упсала и Спегаццини. На борту нас ждёт гурмэ-обед, фотосессия и редкое зрелище рождения айсбергов. Завершим день у знаменитого Перито-Морено, наблюдая за его ледяными обрушениями.",
          photo: "images/trips/active/argentina/programm/programm7.webp",
      },
      {
        title: "Первый день Нового года",
        description:
          "Начнём год с внедорожного приключения вдоль озера и визита в древние пещеры Патагонии. Здесь сохранились наскальные рисунки первых жителей региона — индейцев теуельче. Обед в пещере среди живой истории станет особенным опытом.",
          photo: "images/trips/active/argentina/programm/programm8.webp",
      },
      {
        title: "Край Света — Ушуайя",
        description:
          "Перелёт в самый южный город планеты — Ушуайю, окружённую Андами и проливом Бигля. По пути гид познакомит нас с местными особенностями и проведёт небольшую экскурсию по городу. Вечером — размещение в отеле и ужин.",
          photo: "images/trips/active/argentina/programm/programm9.webp",
      },
      {
        title: "Национальный парк Огненной Земли",
        description:
          "Прогулка по живописным тропам среди нетронутой природы с андаскими лисами, бобрами и десятками птиц. Важная часть дня — поездка на легендарном «Поезде к Концу Света» с панорамными окнами. История и природа сливаются в уникальный опыт.",
          photo: "images/trips/active/argentina/programm/programm10.webp",
        },
      {
        title: "Встреча с пингвинами",
        description:
          "Поездка на остров Martillo и прогулка рядом с колониями пингвинов. Посещение исторического ранчо Харбертон и музея фауны с коллекцией редких животных. Живописная дорога и история первых поселенцев Огненной Земли дополнят впечатления.",
          photo: "images/trips/active/argentina/programm/programm11.webp",
      },
      {
        title: "Переезд к водопадам Игуасу",
        description:
          "Перелёт из Ушуайи к Пуэрто-Игуасу с короткой стыковкой в Буэнос-Айресе. Контраст между суровой Патагонией и тропическими джунглями станет ярким переходом. Вечером — отдых в отеле и ужин.",
          photo: "images/trips/active/argentina/programm/programm12.webp",
      },
      {
        title: "День отдыха в Игуасу",
        description:
          "Свободное время для отдыха после перелёта. Можно провести день у бассейна, насладиться процедурами в SPA или погулять по городу. Лёгкий день для восстановления сил перед новыми приключениями.",
          photo: "images/trips/active/argentina/programm/programm13.webp",
      },
      {
        title: "Бразильская сторона водопадов",
        description:
          "Прогулка по панорамным маршрутам бразильской стороны Игуасу. Увидим легендарную Глотку Дьявола, 275 каскадов водопадов и радуги в брызгах воды. В завершение — визит в Парк птиц с туканами и редкими попугаями.",
          photo: "images/trips/active/argentina/programm/programm14.webp",
      },
      {
        title: "Катер под водопадом",
        description:
          "Яркое завершение в Игуасу — катер, врывающийся в струи водопада, и вертолётная прогулка над каскадами. Два часа настоящего экстрима среди бурлящей воды. Последний вечер у водопадов перед возвращением в столицу.",
          photo: "images/trips/active/argentina/programm/programm15.webp",
      },
      {
        title: "Возвращение в Буэнос-Айрес",
        description:
          "Перелёт в столицу и свободное время для прогулки или шопинга. По желанию — посещение музея MALBA с гидом. Спокойный день для завершения путешествия.",
          photo: "images/trips/active/argentina/programm/programm16.webp",
      },
      {
        title: "До скорой встречи, Аргентина",
        description:
          "Чек-аут из отеля, трансфер в аэропорт и перелёт домой. Аргентина провожает нас словами «hasta luego» — до скорой встречи. В багаже — сотни фотографий и тысячи эмоций.",
          photo: "images/trips/active/argentina/programm/programm17.webp",
      },
    ],
  },
  {
    id: "baikal-feb-1",
    days: [
      {
        title: "Ночной перелёт в Иркутск",
        description:
          "Вылет из Москвы в 21:15 и ночной перелёт в Иркутск (прилёт ~08:10). Разница во времени с Иркутском: +5 часов к Москве. Прибытие на следующий день и старт путешествия.",
        photo: "images/trips/active/baikal/promo/promo1.webp",
      },
      {
        title: "Иркутск — этнопарк ‘Золотая Орда’ — Ольхон (Курма)",
        description:
          "Встреча в аэропорту, организованный трансфер и горячий завтрак (шведский стол). Небольшая обзорная прогулка по Иркутску, затем переезд на Ольхон через этнопарк ‘Золотая Орда’ с национальным бурятским обедом. Прибытие в Курму, пересадка на УАЗы и размещение в отеле (после 20:00).",
        photo: "images/trips/active/baikal/promo/promo2.webp",
      },
      {
        title: "Южный Байкал: голубой лёд, ‘пузырьки’, Шаманка и Бурхан",
        description:
          "Поездка на УАЗах по южной части Байкала: голубой лёд и знаменитые ‘пузырьки’. Остановки у мысов Шаманка и Бурхан, горячий обед. Вечером — баня и горячая купель; ужин и свободное время.",
        photo: "images/trips/active/baikal/promo/promo3.webp",
      },
      {
        title: "Мыс Хобой, ледовая станция ‘Боро‑Боро’ и хивус",
        description:
          "Открываем север Ольхона: могущественный мыс Хобой, гроты и ледовые скульптуры. На станции ‘Боро‑Боро’ — каток на прозрачном льду, мастер‑класс по расколотке, игры и фото‑зоны. В завершение — прогулка на хивусе по зеркальному льду на закате.",
        photo: "images/trips/active/baikal/promo/promo4.webp",
      },
      {
        title: "Возвращение в Иркутск: Галерея современного искусства и дом‑музей Волконских",
        description:
          "Переезд по зимней дороге с Ольхона в Иркутск. Обед в ресторане Галереи современного искусства, затем экскурсия в ‘Дом‑музей Волконских’ — историю декабристов оживляем изнутри. Размещение в отеле в центре города, вечер свободен.",
        photo: "images/trips/active/baikal/promo/promo5.webp",
      },
      {
        title: "Иркутск — аэропорт — перелёт в Москву",
        description:
          "Неспешный завтрак, организованный трансфер в аэропорт и перелёт домой. Берём с собой впечатления о прозрачном льде, торосах и сибирском гостеприимстве.",
        photo: "images/trips/active/baikal/promo/promo6.webp",
      },
    ],
  },
  {
    id: "murmanks-jun-1",
    days: [
      {
        title: "Прибытие в Мурманск и размещение на базе",
        description:
          "Прилёт из Москвы в Мурманск (прямой рейс, ~2,5 часа). Встреча и трансфер. По пути любуемся северной природой и водопадами. Размещение на базе отдыха на берегу моря и реки Титовки, обед с деликатесами локальной кухни. Вечером — гастроужин с мастер‑классом по северной гастрономии: готовим гребешка и морского ежа.",
        photo: "images/trips/active/murmansk/promo/promo1.webp",
      },
      {
        title: "Мотовский залив и морская прогулка за китами",
        description:
          "Завтрак на базе. Большая морская прогулка по Ледовитому океану (до 7 часов): наблюдаем Мотовский залив, водопады на побережье и морских обитателей — горбатых китов, малых полосатиков (минке), белух и тюленей. Вечером — ужин с морепродуктами и баня.",
        photo: "images/trips/active/murmansk/promo/promo2.webp",
      },
      {
        title: "Полуостров Средний — полуостров Рыбачий — мыс Немецкий",
        description:
          "Завтрак. Переход на катере к полуострову Средний, затем джип‑экспедиция на полуостров Рыбачий и к мысу Немецкий — самой северной континентальной точке России. Суровые ландшафты Арктики: водопады и стремительные реки, хребты и скалы, места боевой славы и исторической памяти.",
        photo: "images/trips/active/murmansk/promo/promo3.webp",
      },
      {
        title: "Свободный день и вылет",
        description:
          "Завтрак и свободное время для активностей: снорклинг с китами, морская рыбалка, дайвинг или фридайвинг, альтернативные треккинги. Рыбалка в открытом Баренцевом море — за треской, палтусом или зубаткой. Вечером — заключительный ужин с морепродуктами, выселение и трансфер в аэропорт Мурманска.",
        photo: "images/trips/active/murmansk/promo/promo4.webp",
      },
    ],
  },
  {
    id: "kamchatka-aug-1",
    days: [
      {
        title: "Прилёт и заселение на Халактырском пляже",
        description:
          "Петропавловск‑Камчатский, привет: welcome‑сет у знака ‘Здесь начинается Россия’ и остановка на рынке за локальными деликатесами. Переезд (~1 час) в глемпинг на берегу Тихого океана, размещение и ужин. Дышим океаном, привыкаем к часовому поясу (+9 к Москве).",
        photo: "images/trips/previous/kamchatka_1/promo/promo1.webp",
      },
      {
        title: "Свободный день у океана и баня",
        description:
          "Завтрак, отдых на вулканическом пляже, опционально — уроки серфинга и утренние практики. Вечером — банька с тёплым чаном и ужин. Без обязаловки: максимум отдыха и созерцания моря.",
        photo: "images/trips/previous/kamchatka_1/promo/promo2.webp",
      },
      {
        title: "Авачинский перевал и экструзия Верблюд",
        description:
          "Выезд к Авачинскому перевалу по руслу сухой реки; между вулканами Авачинский и Корякский — трек к экструзии Верблюд (~7 км). Перекус на высоте, встреча с еврашками, заезд на термальные источники ‘Озерки’. Переезд и заселение в гостевой дом с видом на вулканы.",
        photo: "images/trips/previous/kamchatka_1/promo/promo3.webp",
      },
      {
        title: "Морская прогулка: ‘Три брата’, рыбалка и Вулканариум",
        description:
          "Ранний выход в море (до 10 часов): скалы Три брата, наблюдение касаток, китов и нерп, на обед — уха и крабы. Возвращение в порт, прогулка по центру и визит в Вулканариум — краткий ликбез о вулканах Камчатки.",
        photo: "images/trips/previous/kamchatka_1/promo/promo4.webp",
      },
      {
        title: "Трек к Вачкажцу: озёра, ‘цирк’ и водопад",
        description:
          "Переезд к массиву Вачкажец (~70 км). Пеший маршрут ~16 км в спокойном темпе: озеро Тахколоч, природный ‘цирк’ горы Летней Поперечной и водопад. Возвращение к машине, ужин и посещение термальных источников.",
        photo: "images/trips/previous/kamchatka_1/promo/promo5.webp",
      },
      {
        title: "Рафтинг и Малкинские горячие источники",
        description:
          "Утренний переезд на старт сплава (2,5–3 часа), по дороге берём ‘сакачинские’ пирожки. Рафтинг с обедом‑ухой и наблюдением за медведями на берегах. Переезд на дикие Малкинские источники, вечером — возврат в город.",
        photo: "images/trips/previous/kamchatka_1/promo/promo6.webp",
      },
      {
        title: "Дачные источники, Вилючинский перевал и плато Горелого",
        description:
          "Ранний выезд к Дачным источникам через Вилючинский перевал (~900 м). Заезжаем в кальдеру Горелого, смотрим Мутновскую метеостанцию и идём к фумарольным площадкам. Завершаем у водопада ‘Спокойный’, вечером — ужин в городе.",
        photo: "images/trips/previous/kamchatka_1/promo/promo1.webp",
      },
      {
        title: "Свободный день и опции (вертолёт, центр, бухты)",
        description:
          "День без спешки: прогулки по Петропавловску (Никольская сопка, батарея Максутова, бухта), рестораны и шопинг. По погоде — вертолётная прогулка для желающих. Вечером — гастрожужин в ‘Нерка — рыба красная’.",
        photo: "images/trips/previous/kamchatka_1/promo/promo2.webp",
      },
      {
        title: "Сувениры и вылет",
        description:
          "Завтрак и чек‑аут. Этнопрограмма по желанию, рыночек за морепродуктами и сувенирами. Трансфер в аэропорт и вылет домой — Камчатка остаётся в сердце.",
        photo: "images/trips/previous/kamchatka_1/promo/promo3.webp",
      },
    ],
  },
  {
    id: "murmansk-mar-1",
    days: [
      {
        title: "Прилёт, обзорный Мурманск и заселение",
        description:
          "Встреча в аэропорту и обед арктической кухни (гребешки, крабы, палтус/треска и др.). Обзорная прогулка по Мурманску: ледокол ‘Ленин’, Алёша, панорамы и музей морского пароходства; заселение в загородный отель, баня и ужин. Вечером — охота за Северным сиянием при благоприятном прогнозе.",
        photo: "images/trips/previous/murmansk_1/promo/promo1.webp",
      },
      {
        title: "Териберка: тундра, ‘Яйца дракона’ и море",
        description:
          "Завтрак и переезд в Териберку: ветряки, тундра, Кладбище кораблей, пляж ‘Яйца дракона’, водопад Батарейный и качели. Обед с видом на Баренцево море; морская прогулка, затем возвращение в отель, ужин и, при прогнозе, повторная охота за Сиянием.",
        photo: "images/trips/previous/murmansk_1/promo/promo2.webp",
      },
      {
        title: "Снегоходы, хаски‑парк и вылет",
        description:
          "Выселение и активный заезд на снегоходах; визит в хаски‑парк — общение с хаски и кормление оленей. Заключительный обед с северными деликатесами, остановка за сувенирами и трансфер в аэропорт.",
        photo: "images/trips/previous/murmansk_1/promo/promo3.webp",
      },
    ],
  },
  {
    id: "altai-jan-1",
    days: [
      {
        title: "Прилёт и Манжерок: вид с Малой Синюхи",
        description:
          "Встреча в аэропорту Горно‑Алтайска и переезд на всесезонный курорт ‘Манжерок’. Подъём на смотровую горы Малая Синюха: панорамы долины Катуни и хребтов. Заселение, ужин и релакс в открытом тёплом бассейне среди сосен.",
        photo: "images/trips/previous/altai_1/promo/promo1.webp",
      },
      {
        title: "Голубые озёра Катуни и ущелье Горных Духов",
        description:
          "Прогулка к бирюзовым Голубым озёрам Катуни по зимнему сосновому лесу. Обед и лёгкий трек по ущелью Горных Духов с подъёмом на видовую точку над замерзшей Катунью.",
        photo: "images/trips/previous/altai_1/promo/promo2.webp",
      },
      {
        title: "Горно‑Алтайск: Эл‑музей и этно‑аил",
        description:
          "Посещение Эл‑музея: природа и культура Алтая, экспозиции Плато Укок. Этно‑аил с дегустацией национальных продуктов и мастер‑классом по созданию оберега; ужин и отдых.",
        photo: "images/trips/previous/altai_1/promo/promo3.webp",
      },
      {
        title: "Катание в Манжероке и снегоходы",
        description:
          "Свободное утро или катание на горнолыжном курорте ‘Манжерок’ (прокат снаряжения). После обеда — снегоходный заезд по сопкам; вечерняя баня и рождественский ужин.",
        photo: "images/trips/previous/altai_1/promo/promo4.webp",
      },
      {
        title: "Зубропитомник и хаски‑парк",
        description:
          "Встреча с животными региона: зубропитомник, затем хаски‑парк с общением с собаками и кормлением оленей. Обед в ‘Лампе’, возвращение в отель и свободное время.",
        photo: "images/trips/previous/altai_1/promo/promo5.webp",
      },
      {
        title: "Завтрак, выезд и перелёт",
        description:
          "Неспешный завтрак и чек‑аут. Трансфер в аэропорт Горно‑Алтайска (≈1 час) и вылет домой.",
        photo: "images/trips/previous/altai_1/promo/promo6.webp",
      },
    ],
  },
  {
    id: "japan-nov-1",
    days: [
      {
        title: "Токио: прибытие и знакомство",
        description:
          "Прилёт в Токио (Нарита/Ханэда), трансфер и размещение в отеле. Приветственный ужин и вечерняя прогулка по городу.",
        photo: "images/trips/previous/japan_1/promo/promo1.webp",
      },
      {
        title: "Токио: Асакуса — Гинза — Сибуя — Синдзюку",
        description:
          "День с ключевыми районами Токио: Асакуса с атмосферой старого города, Гинза с галереями и универмагами, Сибуя с легендарным перекрёстком и Синдзюку‑Гёэн — зелёный оазис мегаполиса. Хатико — на удачу.",
        photo: "images/trips/previous/japan_1/promo/promo2.webp",
      },
      {
        title: "Никко: наследие ЮНЕСКО",
        description:
          "Переезд в Никко (≈135 км). Храмы и святыни комплекса ЮНЕСКО, водопады и лесистые холмы нацпарка; осенняя кленовая палитра — пауза после шумного Токио.",
        photo: "images/trips/previous/japan_1/promo/promo3.webp",
      },
      {
        title: "Хаконэ и гора Фудзи",
        description:
          "Хаконэ: онсены, виды на Фудзияму и прогулка по озеру. Фуникулёр к долине Овакудани (‘Большая кипящая долина’). Размещение в рёкане со SPA и куро‑тамаго — легендарные ‘чёрные яйца’.",
        photo: "images/trips/previous/japan_1/promo/promo4.webp",
      },
      {
        title: "Киото и Нара",
        description:
          "Синкансеном в Киото (≈2,5 ч). Выезд в Нару: парк с дружелюбными оленями, храмы и святыни. Возвращение и размещение в Киото.",
        photo: "images/trips/previous/japan_1/promo/promo5.webp",
      },
      {
        title: "Киото: золото Кинкаку‑дзи и район гейш Гион",
        description:
          "Кинкаку‑дзи — золотой павильон и ‘открыточный’ Киото. Медитативный сад камней Рёан‑дзи. Вечером — ужин‑знакомство с искусством гейш в историческом районе Гион.",
        photo: "images/trips/previous/japan_1/promo/promo6.webp",
      },
      {
        title: "Арасияма или Universal Studios",
        description:
          "Выбор дня: бамбуковая роща Арасиямы с мостом Тогэцукё и храмами или Universal Studios в Осаке (≈1 ч на поезде) — аттракционы, ‘Парк Юрского периода’ и мир Гарри Поттера. Заключительный ужин.",
        photo: "images/trips/previous/japan_1/promo/promo1.webp",
      },
      {
        title: "Вылет из Осаки",
        description:
          "Завтрак, выезд и трансфер в аэропорт Осаки. При вечернем рейсе — шоппинг и обед в городе; возможна стыковка с короткой прогулкой по Пекину или Шанхаю.",
        photo: "images/trips/previous/japan_1/promo/promo2.webp",
      },
    ],
  },
  {
    id: "uar-mar-1",
    days: [
      {
        title: "Кейптаун: прибытие и круиз на закате",
        description:
          "Трансфер и размещение в отеле. Вечерний круиз по Атлантике на закате и приветственный ужин в африканском стиле с барабанами.",
        photo: "images/trips/previous/uar_1/promo/promo1.webp",
      },
      {
        title: "Кейптаун: Столовая гора, Кирстенбош и вертолёт",
        description:
          "Подъём на Столовую гору — вид на Столовую бухту и ‘12 апостолов’. Прогулка по ботаническому саду Кирстенбош (ЮНЕСКО) и вертолётная прогулка над городом и побережьем.",
        photo: "images/trips/previous/uar_1/promo/promo2.webp",
      },
      {
        title: "Мыс Доброй Надежды и пингвины",
        description:
          "Поездка к мысу Доброй Надежды и мысу Кейп Поинт. Пляж Боулдерс‑Бич с колонией африканских пингвинов и встреча с морскими котиками.",
        photo: "images/trips/previous/uar_1/promo/promo3.webp",
      },
      {
        title: "Мыс Игольный — встреча океанов",
        description:
          "Переезд к самой южной точке Африки — мысу Игольному, где сходятся Атлантический и Индийский океаны. Прогулка к маяку и видовые точки.",
        photo: "images/trips/previous/uar_1/promo/promo4.webp",
      },
      {
        title: "Переезд в Найзну и устрицы на закате",
        description:
          "Трансфер в Найзну: лагуна, яхты и свежайшие устрицы. Круиз по лагуне на закате с дегустацией.",
        photo: "images/trips/previous/uar_1/promo/promo5.webp",
      },
      {
        title: "Найзна: обзор и океанские жители",
        description:
          "Обзорные виды Найзны: Ватерфронт и панорамы лагуны. Морская прогулка в поисках китов и дельфинов (по сезону).",
        photo: "images/trips/previous/uar_1/promo/promo6.webp",
      },
      {
        title: "Тситсикама и устье Стормс‑Ривер",
        description:
          "Национальный парк Тситсикама: подвесные тропы среди скалистых берегов к устью Стормс‑Ривер. По желанию — каякинг по каньону.",
        photo: "images/trips/previous/uar_1/promo/promo1.webp",
      },
      {
        title: "Сафари: частный заповедник (день 1)",
        description:
          "Переезд в частный заповедник у хребта Лангеберг. Вечернее сафари: представители ‘Большой пятёрки’, африканский ужин у костра (бома).",
        photo: "images/trips/previous/uar_1/promo/promo2.webp",
      },
      {
        title: "Сафари: частный заповедник (день 2)",
        description:
          "Утренние и вечерние выезды с рейнджерами: львы, слоны, буйволы, носороги и леопарды, а также антилопы и птицы Капа.",
        photo: "images/trips/previous/uar_1/promo/promo3.webp",
      },
      {
        title: "Франшхук — винная долина",
        description:
          "Трансфер в Франшхук (‘французский уголок’). Прогулка по городу, отдых в отеле, рестораны и бутиковые лавки с изделиями местных мастеров.",
        photo: "images/trips/previous/uar_1/promo/promo4.webp",
      },
      {
        title: "Вина Кейпа: дегустации и терруары",
        description:
          "Экскурсия по хозяйствам долины: Пинотаж, Вионье и другие сорта региона. Дегустации, истории виноделия Кейпа и виды на виноградники.",
        photo: "images/trips/previous/uar_1/promo/promo5.webp",
      },
      {
        title: "Вылет домой",
        description:
          "Трансфер в аэропорт к вашему рейсу и вылет домой. До новых встреч в ЮАР!",
        photo: "images/trips/previous/uar_1/promo/promo6.webp",
      },
    ],
  },
];

export {
  // Общая информация о поездке
  activeTripData,
  inactiveTripData,
  // Развернутая информация о поездках
  tripDetails,
};
