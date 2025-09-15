import type { TripDataType, TripDetailsType } from './type.h.ts';

const tripData: TripDataType[] = [
    {
        id: 'milan-jan-1',
        date: '1 января',
        background: 'url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)',
        destination: 'Милан',
        title: 'Вкус и цвет Италии',
        dateStart: '1 января',
        dateEnd: '5 января',
        gallery: [
            'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format',
            'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format',
        ],
        priceFrom: 1200,
        currency: 'USD',
        locationsCount: 12,
    },
    {
        id: 'moscow-feb-2',
        date: '2 февраля',
        background: 'url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)',
        destination: 'Москва',
    },
    {
        id: 'kamchatka-mar-3',
        date: '3 марта',
        background: 'url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)',
        destination: 'Камчатка',
        title: 'Стихии Камчатки',
        dateStart: '3 марта',
        dateEnd: '10 марта',
        gallery: [
            'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format',
            'https://images.unsplash.com/photo-1519682103700-67c3a42cd04b?q=80&w=1200&auto=format',
        ],
        priceFrom: 2100,
        currency: 'USD',
        locationsCount: 18,
    },
    {
        id: 'vladivostok-apr-4',
        date: '4 апреля',
        background: 'url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)',
        destination: 'Владивосток',
    },
    {
        id: 'kamchatka-may-5',
        date: '5 мая',
        background: 'url(https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg)',
        destination: 'Камчатка',
    },
];

const tripDetails: TripDetailsType[] = [
    {
        id: 'milan-jan-1',
        days: [
            {
                title: 'Прилет и знакомство с городом',
                description: 'Дуомо, Галерея Виктора Эммануила II, аперитив на площади.',
                photo: 'https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg',
            },
            { 
                title: 'Озеро Комо', 
                description: 'Поездка к озеру Комо, виллы, прогулка на катере.', 
                photo: 'https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg',
             },
            { 
                title: 'Шопинг и музейная программа', 
                description: 'Квартал моды, музей Да Винчи, трамвайный тур.', 
                photo: 'https://cdn.tripster.ru/photos/6b006c48-d11e-4e66-9d8e-c884f382113e.jpg',
             },
        ],
    },
    {
        id: 'kamchatka-mar-3',
        days: [
            { title: 'Долина Гейзеров', description: 'Вертолетная экскурсия и купание в термальных источниках.' },
            { title: 'Вулканы и Тихий океан', description: 'Трекинг по лавовым полям, пикник у океана.' },
        ],
    },
];

export {
    tripData,
    tripDetails,
};