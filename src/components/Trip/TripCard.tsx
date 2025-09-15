import { bem } from '../../utils/bem.ts';
import type { TripDataType } from './type.h.ts';

const tripCardClass = 'tripCard';

type TripCardProps = TripDataType & {
    onClick?: () => void;
};

const TripCard = (props: TripCardProps) => {
    const {
        date,
        background,
        destination,
        onClick,
    } = props;

    return (
        <div
            style={{ backgroundImage: background }}
            className={tripCardClass}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onClick?.(); } }}
        >
            <span className={bem(tripCardClass, 'destination')}>{destination}</span>
            <span className={bem(tripCardClass, 'date')}>{date}</span>
        </div>
    );
};

export {
    TripCard,
};