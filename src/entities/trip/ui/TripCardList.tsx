import {
    Fragment,
    useState,
    useCallback,
} from 'react';
import { bem } from '@shared/lib/utils/bem.ts';
import { ActiveTripCard } from './ActiveTripCard.tsx';
import { InactiveTripCard } from './InactiveTripCard.tsx';
import { selectAllActiveTrips, selectAllInactiveTrips } from '@entities/trip/model/selectors.ts';

import './styles/tripCardList.less';

const tripCardListClass = 'tripSection';

const activeTrips = selectAllActiveTrips();
const inactiveTrips = selectAllInactiveTrips();

const TripCardList = () => {
    const [inactiveOpenTripId, setInactiveOpenTripId] = useState<string | null>(null);

    const showInactiveTripOffer = useCallback((id: string) => {
        setInactiveOpenTripId(inactiveOpenTripId !== id ? id : null);
    }, [inactiveOpenTripId]);

    return (
        <Fragment>
            <section className={tripCardListClass}>
                <h3 className={bem(tripCardListClass, 'title')}>Путешествия впереди</h3>
                <div className={bem(tripCardListClass, 'cards')}>
                    {activeTrips.map(({ id, ...props }) => (
                            <ActiveTripCard
                                id={id}
                                key={id}
                                {...props}
                            />
                        ),
                    )}
                </div>
            </section>

            <section className={tripCardListClass}>
                <h3 className={bem(tripCardListClass, 'title')}>Путешествия в прошлом</h3>
                <div className={bem(tripCardListClass, 'cards')}>
                    {inactiveTrips.map(({ id, ...props }) => (
                            <InactiveTripCard
                                id={id}
                                key={id}
                                {...props}
                                canShowInactiveTripOffer={inactiveOpenTripId === id}
                                showInactiveTripOffer={() => showInactiveTripOffer(id)}
                            />
                        ),
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export {
    TripCardList,
};
