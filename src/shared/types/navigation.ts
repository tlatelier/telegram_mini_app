const NAV_SECTIONS = {
    GROUP: 'group',
    PRIVATE: 'private',
    GALLERY: 'gallery',
} as const;

type NavigationSectionType = (typeof NAV_SECTIONS)[keyof typeof NAV_SECTIONS];

const NAV_ITEMS = [
    { key: NAV_SECTIONS.GROUP, label: 'Групповые' },
    { key: NAV_SECTIONS.PRIVATE, label: 'Частные' },
    { key: NAV_SECTIONS.GALLERY, label: 'Галерея' },
] as const;

export {
    NAV_SECTIONS, NAV_ITEMS,
};
export type {
    NavigationSectionType,
};
