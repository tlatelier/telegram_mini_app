import { TripCardList } from "../../entities/trip/ui/TripCardList.tsx";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./start.less";

const StartPage = () => {
    const navigate = useNavigate();
    const handleOpenTrip = useCallback((id: string) => navigate(`/trip/${id}`), [navigate]);
    return (
        <div className="startPage">
            <TripCardList onOpenTrip={handleOpenTrip} />
        </div>
    );
};

export { StartPage };
