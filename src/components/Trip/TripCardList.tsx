import { tripData } from './data.ts';
import { TripCard } from './TripCard';
import './trip.less';

const tripCardListClass = 'tripCardList';

type TripCardListProps = {
    onOpenTrip?: (id: string) => void;
};

const TripCardList = ({ onOpenTrip }: TripCardListProps) => {
    return (
        <div className={tripCardListClass}>
            {tripData.map(({ id, date, background, destination }) => (
                <TripCard
                    key={id}
                    id={id}
                    date={date}
                    background={background}
                    destination={destination}
                    onClick={() => onOpenTrip?.(id)}
                />
            ))}
        </div>
    );
};

export {
    TripCardList,
};