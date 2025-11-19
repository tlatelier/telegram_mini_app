import {
    useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { DESTINATIONS } from '../../shared/lib/destinations.ts';
import type { DestinationKey } from '../../shared/lib/destinations.ts';
import './gallery.less';

const BASE_URL: string = (import.meta as any)?.env?.BASE_URL ?? '/';
type DestConfig = { dir: string, count: number, fileName(i: number): string };

const DEST_CONFIGS: Record<DestinationKey, DestConfig> = {
    uar: { dir: 'uar', count: 60, fileName: (i) => `gallery_uar_${i}.webp` },
    altai: { dir: 'altai', count: 23, fileName: (i) => `gallery-altai-${i}.webp` },
    japan: { dir: 'japan', count: 49, fileName: (i) => `gallery_japan_${i}.webp` },
    baikal: { dir: 'baikal', count: 29, fileName: (i) => `gallery-baikal-${i}.webp` },
    murmansk: { dir: 'murmansk', count: 18, fileName: (i) => `gallery-murmansk-${i}.webp` },
    kamchatka: { dir: 'kamchatka', count: 17, fileName: (i) => `gallery-kamchatka-${i}.webp` },
    uzbekistan: { dir: 'uzbekistan', count: 25, fileName: (i) => `gallery-uzbekistan-${i}.webp` },
    azerbaijan: { dir: 'azerbaijan', count: 20, fileName: (i) => `gallery-azerbaijan-${i}.webp` },
};

const buildUrls = (dir: string, count: number, fileName: (i: number) => string): string[] =>
    Array.from({ length: count }, (_, idx) => `${BASE_URL}images/gallery/${dir}/${fileName(idx + 1)}`);

//

const GalleryPage = () => {
    const location = useLocation();
    const getDestFromSearch = (): string | 'all' => {
        const params = new URLSearchParams(location.search);
        const candidate = (params.get('dest') || '').trim();
        const isValid = (Object.keys(DESTINATIONS) as DestinationKey[]).includes(candidate as DestinationKey);

        return isValid ? (candidate as DestinationKey) : 'all';
    };

    const [dest, setDest] = useState<string | 'all'>(getDestFromSearch);
    const [open, setOpen] = useState<null | 'year' | 'dest'>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const candidate = (params.get('dest') || '').trim();
        const isValid = (Object.keys(DESTINATIONS) as DestinationKey[]).includes(candidate as DestinationKey);
        setDest(isValid ? (candidate as DestinationKey) : 'all');
    }, [location.search]);

    const imagesByDestination = useMemo(() => {
        return Object.fromEntries(
            (Object.keys(DESTINATIONS) as DestinationKey[]).map((key) => {
                const cfg = DEST_CONFIGS[key];

                return [key, buildUrls(cfg.dir, cfg.count, cfg.fileName)];
            }),
        ) as Record<string, string[]>;
    }, []);

    const allImages = useMemo(() => {
        return Object.values(imagesByDestination).flat();
    }, [imagesByDestination]);

    const filtered = useMemo(() => {
        if (dest === 'all') {
            return allImages;
        }

        return imagesByDestination[dest] ?? [];
    }, [allImages, imagesByDestination, dest]);

    return (
        <div className="galleryPage">
            {(() => {
                const left: string[] = [];
                const right: string[] = [];
                filtered.slice(0, 50).forEach((img, idx) => {
                    (idx % 2 === 0 ? left : right).push(img);
                });

                return (
                    <div className="galleryPage__columns">
                        <div className="galleryPage__col">
                            {left.map((image) => (
                                <div
                                    key={image}
                                    className="galleryPage__item"
                                >
                                    <img
                                        alt={image}
                                        src={image}
                                        loading="lazy"
                                        className="galleryPage__img"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="galleryPage__col">
                            {right.map((image) => (
                                <div
                                    key={image}
                                    className="galleryPage__item"
                                >
                                    <img
                                        alt={image}
                                        src={image}
                                        loading="lazy"
                                        className="galleryPage__img"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })()}

            <div className="galleryPage__filters">
                <div className="galleryPage__filtersFixed">
                    <button
                        className="button galleryPage__filterBtn"
                        onClick={() => setOpen(open === 'dest' ? null : 'dest')}
                    >
                        <svg
                            className="galleryPage__filterIcon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden={true}
                        >
                            <path d="M3 6h18" />
                            <path d="M7 12h10" />
                            <path d="M10 18h4" />
                        </svg>
                        {dest === 'all' ? 'Направление' : ((DESTINATIONS as Record<string, string>)[dest] ?? dest)}
                    </button>
                </div>

                {open === 'dest' && (
                    <div
                        className="galleryPage__dropdown"
                        onClick={() => setOpen(null)}
                    >
                        {Object.entries(DESTINATIONS).map(([key, value]) => (
                            <div
                                key={key}
                                className={`galleryPage__option ${dest === key ? 'galleryPage__option--active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDest(key);
                                    setOpen(null);
                                }}
                            >
                                {value}
                            </div>
                        ))}
                        <div
                            className={`galleryPage__option ${
                                dest === 'all' ? 'galleryPage__option--active' : ''
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setDest('all');
                                setOpen(null);
                            }}
                        >
                            Все направления
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export {
    GalleryPage,
};
