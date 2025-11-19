import type { TripDataType } from '../model/type.h';
import { bem } from '../../../shared/lib/utils/bem.ts';
import { useNavigate } from 'react-router-dom';
import { getDestinationKeyByName } from '../../../shared/lib/destinations.ts';

const tripCardClass = 'tripCard';

const InactiveTripCard = (props: TripDataType) => {
    const {
        date,
        background,
        destination,
    } = props;

    const navigate = useNavigate();

    const cardClassName = `${tripCardClass} ${tripCardClass}--past`;

    const onClick = () => {
        const key = getDestinationKeyByName(destination ?? '');

        if (key) {
            navigate(`/gallery?dest=${encodeURIComponent(key)}`);
        } else {
            navigate('/gallery');
        }
    };

    return (
        <div
            tabIndex={0}
            role="button"
            onClick={onClick}
            className={cardClassName}
            style={{ backgroundImage: `url(${background})` }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            <span
                className={`${tripCardClass}__badge ${tripCardClass}__badge--past`}
                aria-label="В воспоминаниях"
            >
                В воспоминаниях
            </span>
            <span className={bem(tripCardClass, 'days')}>Смотреть фото</span>
            <span className={bem(tripCardClass, 'destination')}>{destination}</span>
            <span className={bem(tripCardClass, 'date')}>{date}</span>
        </div>
    );
};

export {
    InactiveTripCard,
};
