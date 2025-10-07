import { useMemo, useState } from "react";
import type { TripId } from "../../entities/trip/model/type.h.ts";
import { activeTripData, tripDetails, inactiveTripData } from "../../entities/trip/model/index.ts";
import { LeadForm } from "../../features/lead-form/LeadForm.tsx";
import { FAQ } from "../../shared/ui/faq/FAQ.tsx";
import { ProgramOverlay } from "../../widgets/program-overlay/ProgramOverlay.tsx";
import { AutoCarousel } from "../../shared/ui/carousel/AutoCarousel.tsx";

import "./trip-details.less";

const FAQ_ITEMS: { q: string; a: string }[] = [
    {
        q: "Что включено в стоимость?",
        a: "Проживание, программа, сопровождение гида. Перелёт и питание оговариваются дополнительно.",
    },
    {
        q: "Размер группы?",
        a: "Обычно 8–12 человек для комфортного темпа и логистики.",
    },
    {
        q: "Можно ли с детьми?",
        a: "Да, но детали маршрута и возраст согласуем заранее.",
    },
    {
        q: "Нужна ли предоплата?",
        a: "Бронь места подтверждается предоплатой. Остаток — перед стартом поездки.",
    },
    {
        q: "Что по возвратам?",
        a: "Условия возврата зависят от сроков отмены — пришлю политику по запросу.",
    },
];

const cls = "tripDetailsPage";

type TripDetailsPageProps = {
    tripId: TripId;
};

const TripDetailsPage = ({ tripId }: TripDetailsPageProps) => {
    const trip = [...activeTripData, ...inactiveTripData].find((t) => t.id === tripId);
    const details = tripDetails.find((d) => d.id === tripId);
    const [overlay, setOverlay] = useState<number | null>(null);

    const days = useMemo(() => details?.days ?? [], [details]);
    const highlights = useMemo(() => details?.highlights ?? [], [details]);

    if (!trip) {
        return <div>Тур не найден</div>;
    }

    return (
        <div className={cls}>
            <div className={`${cls}__hero`} />

            {trip.gallery && trip.gallery.length > 0 && (
                <div style={{ position: "relative" }}>
                    <AutoCarousel
                        images={trip.gallery}
                        intervalMs={2500}
                        height={500}
                        backgroundFit="cover"
                        hasMask={true}
                    />
                    <div className={`${cls}__gallery-caption`}>
                        <div className={`${cls}__gallery-title`}>
                            {trip.title ?? trip.destination}
                        </div>
                        <div className={`${cls}__gallery-date`}>
                            {trip.dateStart ?? trip.date}
                            {trip.dateEnd ? ` — ${trip.dateEnd}` : ""}
                        </div>
                    </div>
                </div>
            )}

            {trip.gallery && trip.gallery.length > 0 && (
                <div className={`${cls}__photosGrid`}>
                    {trip.gallery.slice(0, 4).map((src, i) => (
                        <div
                            key={i}
                            className={`${cls}__photosItem`}
                            style={{ backgroundImage: `url(${src})` }}
                        />
                    ))}
                </div>
            )}

            <div className={`${cls}__facts`}>
                <div className={`${cls}__fact`}>
                    <div className={`${cls}__fact-title`}>{days.length}</div>
                    <div className={`${cls}__fact-sub`}>Дней</div>
                </div>
                <div className={`${cls}__fact`}>
                    <div className={`${cls}__fact-title`}>{trip.locationsCount ?? 15}+</div>
                    <div className={`${cls}__fact-sub`}>Локаций</div>
                </div>
                <div className={`${cls}__fact`}>
                    <div className={`${cls}__fact-title`}>
                        {trip.priceFrom
                            ? `${trip.currency === "USD" ? "$" : "₽"}${trip.priceFrom}`
                            : "По запросу"}
                    </div>
                    <div className={`${cls}__fact-sub`}>Стоимость</div>
                </div>
            </div>

            {highlights.length > 0 && (
                <div className={`${cls}__highlights`}>
                    {highlights.map((h, i) => (
                        <div key={i} className={`${cls}__highlight`}>
                            <div className={`${cls}__highlight-title`}>{h.title}</div>
                            <div>{h.text}</div>
                        </div>
                    ))}
                </div>
            )}

            {days.length > 0 && (
                <div
                    className={`${cls}__programHero`}
                    onClick={() => setOverlay(0)}
                    role="button"
                    tabIndex={0}
                    aria-label="Смотреть программу"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setOverlay(0);
                        }
                    }}
                >
                    <div
                        className={`${cls}__programHero-bg`}
                        style={{ backgroundImage: `url(${days[0].photo ?? ""})` }}
                    />
                    <div className={`${cls}__programHero-mask`} />
                    <div className={`${cls}__programHero-content`}>
                        <button
                            className={`${cls}__submit ${cls}__submitFull`}
                            onClick={() => setOverlay(0)}
                        >
                            Смотреть программу
                        </button>
                    </div>
                </div>
            )}

            <LeadForm tripTitle={trip.title ?? trip.destination} />

            <FAQ items={FAQ_ITEMS} />

            {overlay !== null && (
                <ProgramOverlay
                    days={days}
                    active={overlay}
                    onClose={() => setOverlay(null)}
                    onPrev={() =>
                        setOverlay((i) =>
                            i === null
                                ? (days.length - 1) % days.length
                                : (i - 1 + days.length) % days.length,
                        )
                    }
                    onNext={() => setOverlay((i) => (i === null ? 0 : (i + 1) % days.length))}
                />
            )}
        </div>
    );
};

export { TripDetailsPage };
