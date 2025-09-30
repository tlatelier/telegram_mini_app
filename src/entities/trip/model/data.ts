import type { TripDataType, TripDetailsType } from "./type.h";

const activeTripData: TripDataType[] = [
  {
    id: "argentina-dec-1",
    isActive: true,
    date: "25 декабря",
    background: "images/argentina/promo/promo1.jpg",
    destination: "Аргентина",
    title: "От Буэнос-Айреса до края света",
    dateStart: "25 декабря",
    dateEnd: "10 января",
    gallery: [
      "images/argentina/promo/promo1.jpg",
      "images/argentina/promo/promo2.jpg",
      "images/argentina/promo/promo3.jpg",
      "images/argentina/promo/promo4.jpg",
      "images/argentina/promo/promo5.jpg",
      "images/argentina/promo/promo6.jpg",
    ],
    priceFrom: 6600,
    currency: "USD",
    locationsCount: 15,
  },
];

const activeTripDetails: TripDetailsType[] = [
  {
    id: "argentina-dec-1",
    days: [
      {
        title: "Перелёт в Аргентину",
        description:
          "Долгий перелёт через Стамбул и Сан-Пауло переносит нас из Москвы в Буэнос-Айрес. Это путешествие — ворота в другой континент, где нас ждёт совсем иной ритм жизни. Перелёт станет первой ступенью к большому приключению.",
          photo: "images/argentina/programm/programm1.jpg",
      },
      {
        title: "Прилет и первые впечатления",
        description:
          "Прилет в Буэнос-Айрес, индивидуальный трансфер и размещение в отеле. Отдых после долгого перелёта в одном из самых элегантных районов столицы. Вечером — ужин в местном ресторане и первые знакомства с культурой города.",
          photo: "images/argentina/programm/programm2.jpg",
      },
      {
        title: "Сан-Тельмо и Ла-Бока",
        description:
          "Целый день прогулки по культовым районам Буэнос-Айреса. От аристократического Сан-Тельмо с его антикварными лавками до яркой и фотогеничной Ла-Боки, где зародилось уличное танго. Вечером свободное время для самостоятельных открытий и ужин.",
          photo: "images/argentina/programm/programm3.jpg",
      },
      {
        title: "Элегантный Буэнос-Айрес",
        description:
          "Мы увидим Реколету с её особняками и кладбище, где покоится Эвита Перон. Нас ждёт прогулка по Палермо с его арт-пространствами и культовый цветок Floralis Genérica. Вечером — ужин с танго-шоу в легендарном Café de los Angelitos.",
          photo: "images/argentina/programm/programm4.jpg",
      },
      {
        title: "День гаучо на ранчо",
        description:
          "Выезд в пригород Буэнос-Айреса на ранчо El Ombu. Аутентичный день с асадо на углях, шоу с лошадьми и традициями аргентинских ковбоев. После активной программы можно отдохнуть у бассейна или прогуляться вдоль реки Ареко.",
          photo: "images/argentina/programm/programm5.jpg",
      },
      {
        title: "Путешествие в Патагонию",
        description:
          "Перелёт в Эль-Калафате и обед в местной эстансии. Джип-сафари к горе Фриас подарит панорамы озера Аргентино, Анд и легендарного Фиц-Роя. Вечером — ужин и отдых в отеле с видом на патагонские пейзажи.",
          photo: "images/argentina/programm/programm6.jpg",
      },
      {
        title: "Ледовое сафари",
        description:
          "Целый день путешествия по озеру Аргентино к ледникам Упсала и Спегаццини. На борту нас ждёт гурмэ-обед, фотосессия и редкое зрелище рождения айсбергов. Завершим день у знаменитого Перито-Морено, наблюдая за его ледяными обрушениями.",
          photo: "images/argentina/programm/programm7.jpg",
      },
      {
        title: "Первый день Нового года",
        description:
          "Начнём год с внедорожного приключения вдоль озера и визита в древние пещеры Патагонии. Здесь сохранились наскальные рисунки первых жителей региона — индейцев теуельче. Обед в пещере среди живой истории станет особенным опытом.",
          photo: "images/argentina/programm/programm8.jpg",
      },
      {
        title: "Край Света — Ушуайя",
        description:
          "Перелёт в самый южный город планеты — Ушуайю, окружённую Андами и проливом Бигля. По пути гид познакомит нас с местными особенностями и проведёт небольшую экскурсию по городу. Вечером — размещение в отеле и ужин.",
          photo: "images/argentina/programm/programm9.jpg",
      },
      {
        title: "Национальный парк Огненной Земли",
        description:
          "Прогулка по живописным тропам среди нетронутой природы с андаскими лисами, бобрами и десятками птиц. Важная часть дня — поездка на легендарном «Поезде к Концу Света» с панорамными окнами. История и природа сливаются в уникальный опыт.",
          photo: "images/argentina/programm/programm10.jpg",
        },
      {
        title: "Встреча с пингвинами",
        description:
          "Поездка на остров Martillo и прогулка рядом с колониями пингвинов. Посещение исторического ранчо Харбертон и музея фауны с коллекцией редких животных. Живописная дорога и история первых поселенцев Огненной Земли дополнят впечатления.",
          photo: "images/argentina/programm/programm11.jpg",
      },
      {
        title: "Переезд к водопадам Игуасу",
        description:
          "Перелёт из Ушуайи к Пуэрто-Игуасу с короткой стыковкой в Буэнос-Айресе. Контраст между суровой Патагонией и тропическими джунглями станет ярким переходом. Вечером — отдых в отеле и ужин.",
          photo: "images/argentina/programm/programm12.jpg",
      },
      {
        title: "День отдыха в Игуасу",
        description:
          "Свободное время для отдыха после перелёта. Можно провести день у бассейна, насладиться процедурами в SPA или погулять по городу. Лёгкий день для восстановления сил перед новыми приключениями.",
          photo: "images/argentina/programm/programm13.jpg",
      },
      {
        title: "Бразильская сторона водопадов",
        description:
          "Прогулка по панорамным маршрутам бразильской стороны Игуасу. Увидим легендарную Глотку Дьявола, 275 каскадов водопадов и радуги в брызгах воды. В завершение — визит в Парк птиц с туканами и редкими попугаями.",
          photo: "images/argentina/programm/programm14.jpg",
      },
      {
        title: "Катер под водопадом",
        description:
          "Яркое завершение в Игуасу — катер, врывающийся в струи водопада, и вертолётная прогулка над каскадами. Два часа настоящего экстрима среди бурлящей воды. Последний вечер у водопадов перед возвращением в столицу.",
          photo: "images/argentina/programm/programm15.jpg",
      },
      {
        title: "Возвращение в Буэнос-Айрес",
        description:
          "Перелёт в столицу и свободное время для прогулки или шопинга. По желанию — посещение музея MALBA с гидом. Спокойный день для завершения путешествия.",
          photo: "images/argentina/programm/programm16.jpg",
      },
      {
        title: "До скорой встречи, Аргентина",
        description:
          "Чек-аут из отеля, трансфер в аэропорт и перелёт домой. Аргентина провожает нас словами «hasta luego» — до скорой встречи. В багаже — сотни фотографий и тысячи эмоций.",
          photo: "images/argentina/programm/programm17.jpg",
      },
    ],
  },
];

const inactiveTripData: TripDataType[] = [
  {
    id: "moscow-feb-2",
    isActive: false,
    date: "2 февраля",
    background: "url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)",
    destination: "Москва",
  },
  {
    id: "vladivostok-apr-4",
    isActive: false,
    date: "4 апреля",
    background: "url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)",
    destination: "Владивосток",
  },
  {
    id: "kamchatka-may-5",
    isActive: false,
    date: "5 мая",
    background: "url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)",
    destination: "Камчатка",
  },
];

export {
  // Общая информация о поездке
  activeTripData,
  inactiveTripData,
  // Развернутая информация о поездке
  activeTripDetails,
};
