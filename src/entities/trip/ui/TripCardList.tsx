import { bem } from "../../../shared/lib/utils/bem.ts";
import { activeTripData, inactiveTripData } from "../model/data.ts";
import { TripCard } from "./TripCard.tsx";
import "./trip.less";

const tripCardListClass = "tripSection";

type TripCardListProps = {
  onOpenTrip?: (id: string) => void;
};

const TripCardList = ({ onOpenTrip }: TripCardListProps) => {
  return (
    <>
      <section className={tripCardListClass}>
        <h3 className={bem(tripCardListClass, "title")}>Путешествия впереди</h3>
        <div className={bem(tripCardListClass, 'cards')}>
          {activeTripData.map(({ id, date, background, destination, isActive }) => (
            <TripCard
              key={id}
              id={id}
              date={date}
              isActive={isActive}
              background={background}
              destination={destination}
              onClick={() => onOpenTrip?.(id)}
            />
          ))}
        </div>
      </section>

      <section className="tripSection">
        <h3 className="tripSection__title">Путешествия позади</h3>
        <div className={bem(tripCardListClass, 'cards')}>
          {inactiveTripData.map(({ id, date, background, destination, isActive }) => (
            <TripCard
              key={id}
              id={id}
              date={date}
              isActive={isActive}
              background={background}
              destination={destination}
              onClick={() => onOpenTrip?.(id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export { TripCardList };
