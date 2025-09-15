import type { TripId } from '../components/Trip/type.h.ts';
import { tripData, tripDetails } from '../components/Trip/data.ts';
import { Button } from '../components/Button';
import './trip-details.less';
import { useEffect, useMemo, useRef, useState } from 'react';

const cls = 'tripDetailsPage';

type TripDetailsPageProps = {
    tripId: TripId;
};

const TripDetailsPage = ({ tripId }: TripDetailsPageProps) => {
    const trip = tripData.find((t) => t.id === tripId);
    const details = tripDetails.find((d) => d.id === tripId);
    const [overlay, setOverlay] = useState<number | null>(null);

    // Scroll lock теперь через CSS :has(.tripDetailsPage__overlay)

    if (!trip) {
        return <div>Тур не найден</div>;
    }

    const days = useMemo(() => details?.days ?? [], [details]);
    // overlay content derived from active index

    return (
        <div className={cls}>
            <div className={`${cls}__hero`} />

            {trip.gallery && trip.gallery.length > 0 && (
                <div style={{ position: 'relative' }}>
                    <Gallery images={trip.gallery} showControls={false} />
                    <div className={`${cls}__gallery-caption`}>
                        <div className={`${cls}__gallery-title`}>{trip.title ?? trip.destination}</div>
                        <div className={`${cls}__gallery-date`}>{trip.dateStart ?? trip.date}{trip.dateEnd ? ` — ${trip.dateEnd}` : ''}</div>
                    </div>
                </div>
            )}

            {/* highlights moved below facts */}

            {/* Убрана кнопка "Оставить заявку" по требованию */}

            {trip.gallery && trip.gallery.length > 0 && (
                <div className={`${cls}__photosGrid`}>
                    {trip.gallery.slice(0, 4).map((src, i) => (
                        <div key={i} className={`${cls}__photosItem`} style={{ backgroundImage: `url(${src})` }} />
                    ))}
                </div>
            )}

            <div className={`${cls}__facts`}>
                <div className={`${cls}__fact`}>
                    <div className={`${cls}__fact-title`}>{days.length}</div>
                    <div className={`${cls}__fact-sub`}>Дня</div>
                </div>
                <div className={`${cls}__fact`}>
                    <div className={`${cls}__fact-title`}>{trip.locationsCount ?? 15}+</div>
                    <div className={`${cls}__fact-sub`}>Локаций</div>
                </div>
                <div className={`${cls}__fact`}>
                    <div className={`${cls}__fact-title`}>{trip.priceFrom ? `$${trip.priceFrom}` : 'По запросу'}</div>
                    <div className={`${cls}__fact-sub`}>Стоимость</div>
                </div>
            </div>

            <div className={`${cls}__highlights`}>
                <div className={`${cls}__highlight`}>
                    <div className={`${cls}__highlight-title`}>Познавать и видеть новое</div>
                    <div>Древние мечети, минареты и медресе</div>
                </div>
                <div className={`${cls}__highlight`}>
                    <div className={`${cls}__highlight-title`}>Вкушать с удовольствием</div>
                    <div>Узбекский плов, самса, дымляма</div>
                </div>
                <div className={`${cls}__highlight`}>
                    <div className={`${cls}__highlight-title`}>Жить в эстетике</div>
                    <div>Комфортные отели категории 4+</div>
                </div>
            </div>

            {days.length > 0 && (
                <div
                    className={`${cls}__programHero`}
                    onClick={() => setOverlay(0)}
                    role="button"
                    tabIndex={0}
                    aria-label="Смотреть программу"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setOverlay(0); } }}
                >
                    <div className={`${cls}__programHero-bg`} style={{ backgroundImage: `url(${days[0].photo ?? ''})` }} />
                    <div className={`${cls}__programHero-mask`} />
                    <div className={`${cls}__programHero-content`}>
                        <button className={`${cls}__submit ${cls}__submitFull`} onClick={() => setOverlay(0)}>Смотреть программу</button>
                    </div>
                </div>
            )}

            <div id="lead-form" className={`${cls}__form`}>
                <input className={`${cls}__input`} placeholder="Имя" required />
                <input className={`${cls}__input`} placeholder="Телефон" required />
                <input className={`${cls}__input`} placeholder="Telegram" />
                <button className={`${cls}__submit`}>Отправить</button>
            </div>

            <FAQ />

            {overlay !== null && (
                <Overlay
                    days={days}
                    active={overlay}
                    onClose={() => setOverlay(null)}
                    onPrev={() => setOverlay((i) => (i === null ? (days.length - 1) % days.length : (i - 1 + days.length) % days.length))}
                    onNext={() => setOverlay((i) => (i === null ? 0 : (i + 1) % days.length))}
                />
            )}
        </div>
    );
};

export {
    TripDetailsPage,
};

// Overlay component with swipe
type OverlayProps = {
    days: { title: string; description: string; photo?: string }[];
    active: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
};

const Overlay = ({ days, active, onClose, onPrev, onNext }: OverlayProps) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const startX = useRef<number | null>(null);
    const current = days[active];
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        el.style.transform = `translateX(-${active * 100}%)`;
    }, [active]);

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (dx > 50) onPrev();
        if (dx < -50) onNext();
        startX.current = null;
    };

    return (
        <div className={`${cls}__overlay`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className={`${cls}__overlay-slider`}>
                <div className={`${cls}__overlay-track`} ref={trackRef}>
                    {days.map((d, i) => (
                        <div key={i} className={`${cls}__overlay-slide`}>
                            <div className={`${cls}__overlay-bg`} style={{ backgroundImage: `url(${d.photo ?? ''})` }} />
                            <div className={`${cls}__overlay-mask`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${cls}__overlay-arrows`}>
                <button className={`${cls}__overlay-nav ${cls}__overlay-nav--left`} onClick={onPrev} aria-label="Предыдущий" />
                <button className={`${cls}__overlay-nav ${cls}__overlay-nav--right`} onClick={onNext} aria-label="Следующий" />
            </div>
            <div className={`${cls}__overlay-content`}>
                <div className={`${cls}__overlay-meta`}>{`День ${active + 1} — ${current?.title ?? ''}`}</div>
                <div className={`${cls}__overlay-text`}>{current?.description}</div>
            </div>
            <div className={`${cls}__overlay-actions`}>
                <div className={`${cls}__overlay-btn ${cls}__overlay-btn--secondary`}>
                    <Button text="Назад" callback={onClose} />
                </div>
                <div className={`${cls}__overlay-btn ${cls}__overlay-btn--primary`}>
                    <Button text="Поехали" callback={() => { onClose(); document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' }); }} />
                </div>
            </div>
        </div>
    );
};

// Simple gallery subcomponent
type GalleryProps = { images: string[]; showControls?: boolean };
const Gallery = ({ images, showControls = true }: GalleryProps) => {
    const [index, setIndex] = useState(() => Math.max(0, images.length - 1));
    const next = () => setIndex((i) => (i - 1 + images.length) % images.length); // визуально вправо
    const prev = () => setIndex((i) => (i + 1) % images.length);
    
    useEffect(() => {
        // показываем первый кадр визуально слева, начиная с последнего индекса
        setIndex(Math.max(0, images.length - 1));
    }, [images.length]);

    useEffect(() => {
        if (images.length <= 1) return;
        const id = setInterval(() => {
            setIndex((i) => (i - 1 + images.length) % images.length);
        }, 2500);
        return () => clearInterval(id);
    }, [images.length]);
    const width = `${images.length * 100}%`;
    const transform = `translateX(-${index * (100 / images.length)}%)`;
    return (
        <div className={`${cls}__gallery`}>
            <div className={`${cls}__gallery-track`} style={{ width, transform }}>
                {images.map((src, i) => (
                    <div key={i} className={`${cls}__gallery-item`} style={{ backgroundImage: `url(${src})` }} />
                ))}
            </div>
            {showControls && images.length > 1 && (
                <>
                    <div className={`${cls}__gallery-controls`}>
                        <button className={`${cls}__submit`} onClick={prev}>‹</button>
                        <button className={`${cls}__submit`} onClick={next}>›</button>
                    </div>
                    <div className={`${cls}__bullets`}>
                        {images.map((_, i) => (
                            <span key={i} className={`${cls}__bullet${i === index ? ` ${cls}__bullet--active` : ''}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// Simple FAQ
const FAQ = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const items = [
        { q: 'Что включено в стоимость?', a: 'Проживание, программа, сопровождение гида. Перелёт и питание оговариваются дополнительно.' },
        { q: 'Размер группы?', a: 'Обычно 8–12 человек для комфортного темпа и логистики.' },
        { q: 'Можно ли с детьми?', a: 'Да, но детали маршрута и возраст согласуем заранее.' },
        { q: 'Нужна ли предоплата?', a: 'Бронь места подтверждается предоплатой. Остаток — перед стартом поездки.' },
        { q: 'Что по возвратам?', a: 'Условия возврата зависят от сроков отмены — пришлю политику по запросу.' },
    ];
    return (
        <div className={`${cls}__faq`}>
            {items.map((it, i) => {
                const open = openIdx === i;
                return (
                    <div key={i} className={`${cls}__faq-item`}>
                        <button className={`${cls}__faq-q`} onClick={() => setOpenIdx(open ? null : i)} aria-expanded={open}>
                            {it.q}
                        </button>
                        {open && <div className={`${cls}__faq-a`}>{it.a}</div>}
                    </div>
                );
            })}
        </div>
    );
};


