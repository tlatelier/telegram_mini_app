import type { FC } from "react";
import type { ProgramOverlayDay } from "./ProgramOverlay.tsx";
import { Button } from "../../shared/ui/button/Button.tsx";

type ProgramDaySectionType = {
    onClose(): void;
    parentClass: string;
    displayIndex: number;
    day: ProgramOverlayDay;
};

const ProgramDaySection = (props: ProgramDaySectionType) => {
    const { day, onClose, parentClass, displayIndex } = props;

    const renderDescription = () => {
        const activities = day?.activities ?? [];

        if (!activities.length) {
            return null;
        }

        return (
            <ul className={`${parentClass}__list`}>
                {activities.map((activity, index) => (
                    <li key={index} className={`${parentClass}__li`}>
                        {activity}
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
            <div className={`${parentClass}__action`}>
                <div className={`${parentClass}__btn ${parentClass}__btn--secondary`}>
                    <Button text="Закрыть" callback={onClose} />
                </div>
            </div>
        </>
    );
};

export { ProgramDaySection };
