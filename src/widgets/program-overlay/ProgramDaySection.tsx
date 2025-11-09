import type { ProgramOverlayDay } from "./ProgramOverlay.tsx";
import { Button } from "../../shared/ui/button/Button.tsx";
import { useCallback } from "react";

type ProgramDaySectionType = {
    onClose(): void;
    parentClass: string;
    displayIndex: number;
    day: ProgramOverlayDay;
};

const ProgramDaySection = (props: ProgramDaySectionType) => {
    const { day, onClose, parentClass, displayIndex } = props;

    const onScreenClose = useCallback(() => {
        onClose?.();
        setTimeout(() => {
            document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
        }, 0);
    }, [onClose]);

    const renderDescription = () => {
        const activities = day?.activities ?? [];

        if (!activities.length) {
            return null;
        }

        return (
            <ul className={`${parentClass}__list`}>
                {activities.map((activity, index) => (
                    <li key={index} className={`${parentClass}__li`}>
                        {typeof activity === "string"
                            ? activity
                            : `${activity?.strong ?? ""}${activity?.text ? (activity?.strong ? " — " : "") + activity?.text : ""}`}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <div className={`${parentClass}__mask`} />
            <div className={`${parentClass}__content`}>
                <div className={`${parentClass}__meta`}>
                    {`День ${displayIndex + 1} — ${day?.title ?? ""}`}
                </div>
                <div className={`${parentClass}__text`}>{renderDescription()}</div>
            </div>
            <div className={`${parentClass}__actions`}>
                <div className={`${parentClass}__btn ${parentClass}__btn--secondary`}>
                    <Button text="Закрыть" callback={onClose} />
                </div>
                <div className={`${parentClass}__btn ${parentClass}__btn--primary`}>
                    <Button text="Хочу поехать!" callback={onScreenClose} />
                </div>
            </div>
        </>
    );
};

export { ProgramDaySection };
