import { useMemo } from 'react';
import type { TripDataType } from '../model/type.h';
import { bem } from '../../../shared/lib/utils/bem.ts';

const tripCardClass = 'tripCard';

type TripCardProps = TripDataType & {
    onClick?(): void;
};

const ActiveTripCard = (props: TripCardProps) => {
    const {
        date,
        onClick,
        isActive,
        background,
        destination,
        status: statusProp,
    } = props;

    const statusKey = statusProp ?? (isActive ? 'upcoming' : 'past');

    const status = useMemo(() => {
        let mod = 'wip';
        let text = 'В проработке';

        switch (statusKey) {
            case 'upcoming':
                mod = 'upcoming';
                text = 'Идёт набор';
                break;

            case 'past':
                mod = 'past';
                text = 'В воспоминаниях';
                break;
        }

        return { mod, text };
    }, [statusKey]);

    const cardClassName = `${tripCardClass} ${tripCardClass}--${status.mod}`;

    return (
        <div
            tabIndex={0}
            role="button"
            onClick={onClick}
            className={cardClassName}
            style={{ backgroundImage: `url(${background})` }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick?.();
                }
            }}
        >
            <span
                className={`${tripCardClass}__badge ${tripCardClass}__badge--${status.mod}`}
                aria-label={status.text}
            >
                {status.text}
            </span>
            <span className={bem(tripCardClass, 'destination')}>{destination}</span>
            <span className={bem(tripCardClass, 'date')}>{date}</span>
        </div>
    );
};

export {
    ActiveTripCard,
};
