import { useMemo, useCallback, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { bem } from '@shared/lib/utils/bem.ts';
import { Button } from "@shared/ui/button/Button.tsx";
import { getDestinationKeyByName } from '@shared/lib/destinations.ts';
import { withBase } from '@shared/lib/utils/withBase.ts';
import { submitBitrix24Form } from '@shared/lib/utils/submitBitrix24Form.ts';
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
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Сбрасываем состояние при закрытии оверлея
    useEffect(() => {
        if (!canShowInactiveTripOffer) {
            setFormSubmitted(false);
        }
    }, [canShowInactiveTripOffer]);


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

    const handleInterestClick = useCallback((event?: React.MouseEvent<HTMLDivElement>) => {
        // Останавливаем всплытие, чтобы не сработал onClick на родительском div
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        
        // Если форма уже отправлена, закрываем оверлей (возвращаем в первоначальное состояние)
        if (formSubmitted) {
            showInactiveTripOffer();
            return;
        }
        
        // Отправляем данные в Bitrix24 сразу, независимо от компонентов
        submitBitrix24Form({
            b24Form: 'inline/13/cibjyu',
            loaderUrl: 'https://cdn-ru.bitrix24.ru/b34565224/crm/form/loader_13.js',
            destination: destination ?? '',
        });
        
        // Показываем финальный экран сразу
        flushSync(() => {
            setFormSubmitted(true);
        });
    }, [formSubmitted, showInactiveTripOffer, destination]);

    return (
        <div
            className={cardClass}
            onClick={showInactiveTripOffer}
            style={{ backgroundImage: `url(${withBase(background)})` }}
        >
            {canShowInactiveTripOffer ? (
                <div 
                    className={bem(componentClass, 'offer')}
                    onClick={(e) => e.stopPropagation()}
                >
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

                    <div 
                        key={formSubmitted ? 'submitted' : 'initial'}
                        className={bem(componentClass, 'offer-info')}
                    >
                        {formSubmitted ? (
                            <span>
                                Спасибо за интерес! Мы вернемся к вам в приоритетном порядке, когда сформируем предложение на это направление.
                            </span>
                        ) : (
                            <span>
                                Это направление завершилось, но мы можем повторить его для вас! Если вам интересно это направление, дайте нам знать — мы вернемся с предложением, когда решим его повторить.
                            </span>
                        )}
                    </div>

                    <div 
                        className={bem(componentClass, 'offer-actions')}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {destinationKey && (
                            <Button
                                active={true}
                                text="Фотографии"
                                callback={(e) => {
                                    e?.stopPropagation();
                                    handleComponentClick();
                                }}
                                auxClass={bem(componentClass, 'offer-button--secondary')}
                            />
                        )}
                        <Button
                            common={true}
                            text={formSubmitted ? 'Закрыть' : 'Интересно'}
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
