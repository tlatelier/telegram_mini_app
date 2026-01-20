const DESTINATIONS = {
    uar: 'ЮАР',
    altai: 'Алтай',
    japan: 'Япония',
    baikal: 'Байкал',
    murmansk: 'Мурманск',
    kamchatka: 'Камчатка',
    uzbekistan: 'Узбекистан',
    azerbaijan: 'Азербайджан',
} as const;

type DestinationKey = keyof typeof DESTINATIONS;

const getDestinationKeyByName = (inputName: string): DestinationKey | null => {
    const name = (inputName ?? '').trim();

    if (!name) {
        return null;
    }

    for (const [key, label] of Object.entries(DESTINATIONS)) {
        if (label === name) {
            return key as DestinationKey;
        }
    }

    return null;
};

export {
    DESTINATIONS,
    getDestinationKeyByName,
};
export type {
    DestinationKey,
};
