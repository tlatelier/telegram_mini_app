import { Button } from "../../shared/ui/button/Button";
import { OverlayCarousel } from "../../features/overlay/OverlayCarousel";
import "./case-overlay.less";

const cls = "caseOverlay";

type CaseDay = { title: string; description?: string; photo?: string };

type CaseOverlayProps = {
    title: string;
    meta?: string;
    days: CaseDay[];
    active: number;
    onPrev: () => void;
    onNext: () => void;
    onClose: () => void;
};

export const CaseOverlay = ({
    title,
    meta,
    days,
    active,
    onPrev,
    onNext,
    onClose,
}: CaseOverlayProps) => {
    const current = days[active];

    return (
        <div className={`${cls}`}>
            <OverlayCarousel
                images={days.map((d) => d.photo ?? "")}
                active={active}
                onChange={() => {}}
                onPrev={onPrev}
                onNext={onNext}
                renderContent={() => (
                    <>
                        <div className={`${cls}__metaTop`}>
                            <div className={`${cls}__title`}>{title}</div>
                            {meta && <div className={`${cls}__meta`}>{meta}</div>}
                        </div>
                        <div className={`${cls}__content`}>
                            <div className={`${cls}__mask`} />
                            <div
                                className={`${cls}__meta`}
                            >{current?.title}</div>
                            {current?.description && (
                                <div className={`${cls}__text`}>{current.description}</div>
                            )}
                        </div>
                        <div className={`${cls}__actions`}>
                            <div className={`${cls}__btn ${cls}__btn--secondary`}>
                                <Button text="Назад" callback={onClose} />
                            </div>
                            <div className={`${cls}__btn ${cls}__btn--primary`}>
                                <Button
                                    text="Сформировать свою"
                                    callback={() => {
                                        onClose();
                                        document
                                            .getElementById("lead-form")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}  
                                />
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
    );
};
