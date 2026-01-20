import { TripCardList } from '@entities/trip/ui/TripCardList.tsx';
import './start.less';

const StartPage = () => {
    return (
        <div className="startPage">
            <TripCardList />
        </div>
    );
};

export {
    StartPage,
};
