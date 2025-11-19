import { bem } from '../../../shared/lib/utils/bem.ts';
import {
    activeTripData,
    inactiveTripData,
} from '../model';
import { ActiveTripCard } from './ActiveTripCard.tsx';
import { InactiveTripCard } from './InactiveTripCard.tsx';

import './trip.less';

const tripCardListClass = 'tripSection';

type TripCardListProps = {
    onOpenTrip?(id: string): void;
};

const TripCardList = ({ onOpenTrip }: TripCardListProps) => {
    return (
        <>
            <section className={tripCardListClass}>
                <h3 className={bem(tripCardListClass, 'title')}>Путешествия впереди</h3>
                <div className={bem(tripCardListClass, 'cards')}>
                    {activeTripData.map(
                        ({ id, date, background, destination, status, isActive }) => (
                            <ActiveTripCard
                                key={id}
                                id={id}
                                date={date}
                                status={status}
                                isActive={isActive}
                                background={background}
                                destination={destination}
                                onClick={() => onOpenTrip?.(id)}
                            />
                        ),
                    )}
                </div>
            </section>

            <section className="tripSection">
                <h3 className="tripSection__title">Путешествия позади</h3>
                <div className={bem(tripCardListClass, 'cards')}>
                    {inactiveTripData.map(
                        ({ id, date, background, destination }) => (
                            <InactiveTripCard
                                id={id}
                                key={id}
                                date={date}
                                background={background}
                                destination={destination}
                            />
                        ),
                    )}
                </div>
            </section>
        </>
    );
};

export {
    TripCardList,
};
