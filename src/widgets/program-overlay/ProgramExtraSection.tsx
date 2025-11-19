import { Button } from '../../shared/ui/button/Button.tsx';
import { useCallback } from 'react';

type ProgramExtraSectionType = {
    onClose(): void;
    parentClass: string;
    sections?: { title: string, items: string[] }[];
    offer?: {
        benefits: string[];
        includes: string[];
        scarcity?: string;
        quote?: { text: string, author?: string };
        ctaPrimaryText?: string;
        ctaSecondaryText?: string;
    };
    onBackToStart?(): void;
};

const LEAD_FORM_ID = 'lead-form';

const ProgramExtraSection = (props: ProgramExtraSectionType) => {
    const { onClose, parentClass, sections, offer, onBackToStart } = props;

    const onScreenClose = useCallback(() => {
        onClose?.();

        setTimeout(() => {
            document.getElementById(LEAD_FORM_ID)?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, [onClose]);

    return (
        <>
            <div className={`${parentClass}__finalMask`} />
            <div className={`${parentClass}__final`}>
                {/* Режим №1: структурные секции */}
                {sections?.length && !offer && (
                    <>
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <div className={`${parentClass}__finalTitle`}>{section.title}</div>
                                <ul className={`${parentClass}__finalList`}>
                                    {section.items.map((it, i) => (
                                        <li
                                            key={i}
                                            className={`${parentClass}__finalItem`}
                                        >
                                            {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}

                {/* Режим №2: конверсионный оффер */}
                {offer && (
                    <div className={`${parentClass}__offer`}>
                        <div className={`${parentClass}__finalTitle`}>Почему это путешествие стоит того</div>
                        <ul className={`${parentClass}__finalList`}>
                            {offer.benefits?.map((b, i) => (
                                <li
                                    key={i}
                                    className={`${parentClass}__finalItem`}
                                >✓ {b}
                                </li>
                            ))}
                        </ul>

                        <div className={`${parentClass}__finalTitle`}>Что включено</div>
                        <ul className={`${parentClass}__finalList`}>
                            {offer.includes?.map((b, i) => (
                                <li
                                    key={i}
                                    className={`${parentClass}__finalItem`}
                                >• {b}
                                </li>
                            ))}
                        </ul>

                        {offer.scarcity && (
                            <div className={`${parentClass}__scarcity`}>{offer.scarcity}</div>
                        )}
                        {offer.quote && (
                            <div className={`${parentClass}__quote`}>“{offer.quote.text}”{offer.quote.author ? ` — ${offer.quote.author}` : ''}</div>
                        )}
                    </div>
                )}
            </div>
            <div className={`${parentClass}__actions`}>
                <div className={`${parentClass}__btn ${parentClass}__btn--secondary`}>
                    <Button
                        text={offer?.ctaSecondaryText ?? 'Закрыть'}
                        callback={onClose}
                    />
                </div>
                <div className={`${parentClass}__btn ${parentClass}__btn--primary`}>
                    <Button
                        text={offer?.ctaPrimaryText ?? 'Хочу поехать!'}
                        callback={onScreenClose}
                    />
                </div>
                <div className={`${parentClass}__btn ${parentClass}__btn--secondary ${parentClass}__btn--wide`}>
                    <Button
                        text="К началу программы"
                        callback={onBackToStart}
                    />
                </div>
            </div>
        </>
    );
};

export {
    ProgramExtraSection,
};
