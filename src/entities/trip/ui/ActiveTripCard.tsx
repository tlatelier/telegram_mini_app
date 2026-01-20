import { useCallback, useMemo } from 'react';
import { bem } from '@shared/lib/utils/bem.ts';
import { withBase } from '@shared/lib/utils/withBase.ts';
import { useNavigate } from 'react-router-dom';
import type { TripDataType } from '@entities/trip/model/type.h';
import { TripStatus } from '@entities/trip/model/type.h';

import './styles/activeTripCard.less';

const componentClass = 'activeTripCard';

type TripCardProps = TripDataType & {
    onClick?(): void;
};

const ActiveTripCard = (props: TripCardProps) => {
    const {
        id,
        date,
        status,
        background,
        destination,
    } = props;

    const navigate = useNavigate();

    const handleOpenTrip = useCallback(() => {
        navigate(`/trip/${id}`);
    }, [navigate]);

    const { mod, text } = useMemo(() => {
        if (status === TripStatus.Upcoming) {
            return { mod: 'upcoming', text: 'Идёт набор' };
        }

        return { mod: 'wip', text: 'В проработке' };
    }, [status]);

    return (
        <div
            onClick={handleOpenTrip}
            className={componentClass}
            style={{ backgroundImage: `url(${withBase(background)})` }}
        >
            <div className={bem(componentClass, 'info')}>
                <span className={`${componentClass}__badge ${componentClass}__badge--${mod}`}>
                    {text}
                </span>
                <div className={bem(componentClass, 'meta')}>
                    <span className={bem(componentClass, 'date')}>{date}</span>
                    <span className={bem(componentClass, 'destination')}>{destination}</span>
                </div>
            </div>
        </div>
    );
};

export {
    ActiveTripCard,
};
