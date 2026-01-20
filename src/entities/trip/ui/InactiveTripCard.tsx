import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bem } from '@shared/lib/utils/bem.ts';
import { Button } from "@shared/ui/button/Button.tsx";
import { getDestinationKeyByName } from '@shared/lib/destinations.ts';
import { withBase } from '@shared/lib/utils/withBase.ts';
import type { TripDataType } from '../model/type.h';

import './styles/inactiveTripCard.less';

const componentClass = 'inactiveTripCard';

type InactiveTripCardType = TripDataType & {
    showInactiveTripOffer(): void;
    canShowInactiveTripOffer: boolean;
};

const InactiveTripCard = (props: InactiveTripCardType) => {
    const {
        background,
        destination,
        showInactiveTripOffer,
        canShowInactiveTripOffer,
    } = props;

    const navigate = useNavigate();

    const destinationKey = useMemo(() => {
        return getDestinationKeyByName(destination ?? '');
    }, [destination]);

    const handleComponentClick = useCallback(() => {
        if (destinationKey) {
            navigate(`/gallery?dest=${encodeURIComponent(destinationKey)}`);
        }
    }, [destinationKey]);

    const cardClass = `
        ${componentClass}
        ${canShowInactiveTripOffer ? bem(componentClass, 'blur') : ''}`;

    // Вынести отдельно, как-то унифицировать
    const handleInterestClick = useCallback(() => {}, []);

    return (
        <div
            className={cardClass}
            onClick={showInactiveTripOffer}
            style={{ backgroundImage: `url(${withBase(background)})` }}
        >
            {canShowInactiveTripOffer ? (
                <div className={bem(componentClass, 'offer')}>
                    <div className={bem(componentClass, 'offer-header')}>
                        <span className={bem(componentClass, 'offer-destination')}>
                            {destination}
                        </span>
                        <span className={bem(componentClass, 'offer-status')}>
                            Завершилось
                        </span>
                        {destinationKey && (
                            <span className={bem(componentClass, 'offer-photos')}>
                                Есть фотографии
                            </span>
                        )}
                    </div>

                    <div className={bem(componentClass, 'offer-info')}>
                        Круто! Мы вернемся к вам в приоритетном порядке, когда сформируем предложние на это направление!
                        Скажите нам, что вам интересно это направление, — и мы вернемся с предложением, когда решим его
                        повторить!
                    </div>

                    <div className={bem(componentClass, 'offer-actions')}>
                        {destinationKey && (
                            <Button
                                active={true}
                                text="Фотографии"
                                callback={handleComponentClick}
                                auxClass={bem(componentClass, 'offer-button--secondary')}
                            />
                        )}
                        <Button
                            common={true}
                            text='Спасибо / Интересно'
                            callback={handleInterestClick}
                            auxClass={bem(componentClass, 'offer-button--primary')}
                        />
                    </div>
                </div>
            ) : (
                <div className={bem(componentClass, 'info')}>
                    <span className={bem(componentClass, 'destination')}>
                        {destination}
                    </span>
                </div>
            )}
        </div>
    );
};

export {
    InactiveTripCard,
};
