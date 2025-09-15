import { TripCardList } from '../components/Trip/TripCardList.tsx';
import type { TripId } from '../components/Trip/type.h.ts';

type StartPageProps = {
    onOpenTrip?: (id: TripId) => void;
};

const StartPage = ({ onOpenTrip }: StartPageProps) => {
    return (
        <TripCardList onOpenTrip={onOpenTrip} />
    );
};

export {
    StartPage,
};