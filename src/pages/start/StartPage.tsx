import { TripCardList } from "../../entities/trip/ui/TripCardList.tsx";
import type { TripId } from "../../entities/trip/model/type.h.ts";
import "./start.less";

type StartPageProps = {
    onOpenTrip?: (id: TripId) => void;
};

const StartPage = ({ onOpenTrip }: StartPageProps) => {
    return (
        <div className="startPage">
            <TripCardList onOpenTrip={onOpenTrip} />
        </div>
    );
};

export { StartPage };
