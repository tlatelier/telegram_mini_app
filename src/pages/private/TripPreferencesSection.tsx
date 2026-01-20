import { useEffect, useMemo, useState } from 'react';
import { Button } from '@shared/ui/button/Button';

const cls = 'privateTrips';

type ChipValue = string;

const DURATION: ChipValue[] = ['3–5 дней', '6–9 дней', '10–14 дней'];
const GROUP: ChipValue[] = ['Соло', 'Пара', 'Семья', 'Компания'];
const RATE: ChipValue[] = ['Спокойный', 'Сбалансированный', 'Активный'];
const INTERESTS: ChipValue[] = ['Гастрономия', 'Природа', 'Архитектура', 'Арт', 'Вино', 'Концерты'];
const BUDGET: ChipValue[] = ['до 3000$', '3000-7000$', 'более 7000$'];

type TripPreferencesSectionProps = {
    onCta(): void;
    onChange?(value: TripPreferencesValue): void;
};

type TripPreferencesValue = {
    duration: ChipValue | null;
    group: ChipValue | null;
    rate: ChipValue | null;
    interests: ChipValue[];
    budget: ChipValue | null;
    summary: string;
    leadText: string;
};

const TripPreferencesSection = (props: TripPreferencesSectionProps) => {
    const { onCta, onChange } = props;

    const [duration, setDuration] = useState<ChipValue | null>(null);
    const [group, setGroup] = useState<ChipValue | null>(null);
    const [rate, setRate] = useState<ChipValue | null>(null);
    const [interests, setInterests] = useState<ChipValue[]>([]);
    const [budget, setBudget] = useState<ChipValue | null>(null);

    const toggleInterest = (value: ChipValue) => {
        setInterests((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);
    };

    const summary = useMemo(() => {
        return [duration, group, rate, interests.join(', '), budget].filter(Boolean).join(' · ');
    }, [duration, group, rate, interests, budget]);

    const leadText = useMemo(() => {
        const lines: string[] = [];

        if (duration) lines.push(`Длительность: ${duration}`);
        if (group) lines.push(`Состав: ${group}`);
        if (rate) lines.push(`Темп: ${rate}`);
        if (interests.length) lines.push(`Интересы: ${interests.join(', ')}`);
        if (budget) lines.push(`Бюджет: ${budget}`);

        return lines.join('\n');
    }, [duration, group, rate, interests, budget]);

    useEffect(() => {
        onChange?.({
            duration,
            group,
            rate,
            interests,
            budget,
            summary,
            leadText,
        });
    }, [budget, duration, group, interests, leadText, onChange, rate, summary]);

    return (
        <section
            id="prefs"
            className={`${cls}__prefs`}
        >
            <h2 className={`${cls}__sectionTitle`}>Ваши предпочтения</h2>
            <div className={`${cls}__prefsGroup`}>
                <div className={`${cls}__prefsLabel`}>Длительность</div>
                <div className={`${cls}__chips`}>
                    {DURATION.map((v) => (
                        <button
                            key={v}
                            className={`${cls}__chip${duration === v ? ` ${cls}__chip--active` : ''}`}
                            onClick={() => setDuration(duration === v ? null : v)}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`${cls}__prefsGroup`}>
                <div className={`${cls}__prefsLabel`}>Состав</div>
                <div className={`${cls}__chips`}>
                    {GROUP.map((v) => (
                        <button
                            key={v}
                            className={`${cls}__chip${group === v ? ` ${cls}__chip--active` : ''}`}
                            onClick={() => setGroup(group === v ? null : v)}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`${cls}__prefsGroup`}>
                <div className={`${cls}__prefsLabel`}>Темп поездки</div>
                <div className={`${cls}__chips`}>
                    {RATE.map((v) => (
                        <button
                            key={v}
                            className={`${cls}__chip${rate === v ? ` ${cls}__chip--active` : ''}`}
                            onClick={() => setRate(rate === v ? null : v)}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`${cls}__prefsGroup`}>
                <div className={`${cls}__prefsLabel`}>Интересы</div>
                <div className={`${cls}__chips`}>
                    {INTERESTS.map((v) => (
                        <button
                            key={v}
                            className={`${cls}__chip${interests.includes(v) ? ` ${cls}__chip--active` : ''}`}
                            onClick={() => toggleInterest(v)}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`${cls}__prefsGroup`}>
                <div className={`${cls}__prefsLabel`}>Бюджет поездки</div>
                <div className={`${cls}__chips`}>
                    {BUDGET.map((v) => (
                        <button
                            key={v}
                            className={`${cls}__chip${budget === v ? ` ${cls}__chip--active` : ''}`}
                            onClick={() => setBudget(budget === v ? null : v)}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            {summary && <div className={`${cls}__prefsSummary`}>{summary}</div>}
            <div className={`${cls}__prefsCta`}>
                <Button
                    text="Сформировать предложение"
                    callback={onCta}
                    active={true}
                />
            </div>
        </section>
    );
};

export {
    TripPreferencesSection,
};

export type {
    TripPreferencesValue,
};
