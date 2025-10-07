import { Button } from "../../shared/ui/button/Button.tsx";
import { useCallback } from "react";

type ProgramExtraSectionType = {
    onClose(): void;
    parentClass: string;
};

const LEAD_FORM_ID = "lead-form";

const ProgramExtraSection = (props: ProgramExtraSectionType) => {
    const { onClose, parentClass } = props;

    const onScreenClose = useCallback(() => {
        onClose?.();

        setTimeout(() => {
            document.getElementById(LEAD_FORM_ID)?.scrollIntoView({ behavior: "smooth" });
        }, 0);
    }, []);

    return (
        <>
            <div className={`${parentClass}__finalMask`} />
            <div className={`${parentClass}__final`}>
                <div className={`${parentClass}__finalTitle`}>Что вас ждёт в этой поездке</div>
                <ul className={`${parentClass}__finalList`}>
                    <li className={`${parentClass}__finalItem`}>
                        Продуманная программа по ключевым локациям
                    </li>
                    <li className={`${parentClass}__finalItem`}>
                        Сильные эмоции и редкие опыты без спешки
                    </li>
                    <li className={`${parentClass}__finalItem`}>
                        Комфортное размещение и логистика
                    </li>
                    <li className={`${parentClass}__finalItem`}>
                        Забота и сопровождение гида 24/7
                    </li>
                </ul>
            </div>
            <div className={`${parentClass}__actions`}>
                <div className={`${parentClass}__btn ${parentClass}__btn--secondary`}>
                    <Button text="Закрыть" callback={onClose} />
                </div>
                <div className={`${parentClass}__btn ${parentClass}__btn--primary`}>
                    <Button text="Поехали" callback={onScreenClose} />
                </div>
            </div>
        </>
    );
};

export {
    ProgramExtraSection,
};
