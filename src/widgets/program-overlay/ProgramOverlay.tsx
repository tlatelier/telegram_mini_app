import { useEffect, useMemo, useState } from "react";
import { Button } from "../../shared/ui/button/Button";
import { OverlayCarousel } from "../../features/overlay/OverlayCarousel";
import "./program-overlay.less";
import { ProgramDaySection } from "./ProgramDaySection.tsx";
import { ProgramExtraSection } from "./ProgramExtraSection.tsx";

const blockClass = "programOverlay";

export type ProgramOverlayDay = {
    title: string;
    activities: string[];
    photo?: string;
};

type ProgramOverlayProps = {
    days: ProgramOverlayDay[];
    active: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
};

const ProgramOverlay = (props: ProgramOverlayProps) => {
    const { days, active, onPrev, onNext, onClose } = props;

    const [displayIndex, setDisplayIndex] = useState<number>(active);

    useEffect(() => {
        // Синхронизация внешнего индекса (только для реальных дней)
        if (active <= days.length - 1) {
            setDisplayIndex(active);
        }
    }, [active, days.length]);

    const images = useMemo(() => {
        // Финальный кадр — используем фото последнего (или первого) дня
        const finalImage = days[days.length - 1]?.photo ?? days[0]?.photo ?? "";

        return [...days.map((d) => d.photo ?? ""), finalImage];
    }, [days]);

    const isFinal = displayIndex === days.length;
    const current = days[Math.min(displayIndex, days.length - 1)];

    const handlePrev = () => {
        if (isFinal) {
            setDisplayIndex(days.length - 1);

            return;
        }

        onPrev();
    };

    const handleNext = () => {
        if (displayIndex === days.length - 1) {
            // Переход на финальный экран
            setDisplayIndex(days.length);

            return;
        }

        onNext();
    };

    const onChange = (i: number) => {
        // Свайп влево/вправо
        if (i === displayIndex + 1) {
            handleNext();
        } else if (i === displayIndex - 1) {
            handlePrev();
        } else {
            // Прямой переход (редкий кейс) — нормализуем
            if (i === days.length) {
                setDisplayIndex(days.length);
            } else if (i >= 0 && i < days.length) {
                // Подымаем наверх для согласованности
                if (i > displayIndex) onNext();
                if (i < displayIndex) onPrev();
            }
        }
    };

    return (
        <div className={`${blockClass}`}>
            <OverlayCarousel
                images={images}
                active={displayIndex}
                onChange={onChange}
                onPrev={handlePrev}
                onNext={handleNext}
                renderContent={() => (
                    <>
                        {!isFinal ? (
                            <ProgramDaySection
                                day={current}
                                onClose={onClose}
                                parentClass={blockClass}
                                displayIndex={displayIndex}
                            />
                        ) : (
                            <ProgramExtraSection onClose={onClose} parentClass={blockClass} />
                        )}
                    </>
                )}
            />
        </div>
    );
};

export { ProgramOverlay };
