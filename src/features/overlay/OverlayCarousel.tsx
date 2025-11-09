import type { ReactNode } from "react";
import { useRef } from "react";
import { Carousel } from "../../shared/ui/carousel/Carousel";
import "./overlay.less";

const baseClass = "overlay";

type OverlayCarouselProps = {
    images: string[];
    active: number;
    onChange: (index: number) => void;
    onPrev: () => void;
    onNext: () => void;
    renderContent?: (activeIndex: number) => ReactNode;
    onLastNext?: () => void;
    hideArrowsOnLast?: boolean;
};

export const OverlayCarousel = ({
    images,
    active,
    onChange,
    onPrev,
    onNext,
    renderContent,
    onLastNext,
    hideArrowsOnLast = false,
}: OverlayCarouselProps) => {
    const isLast = active >= images.length - 1;
    const isFirst = active <= 0;
    const rootRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className={baseClass} ref={rootRef}>
            <div className={`${baseClass}__slider`}>
                <Carousel
                    slides={images}
                    index={active}
                    onChangeIndex={onChange}
                    loop={false}
                    autoplayInterval={null}
                    showControls={false}
                    itemHeight="100dvh"
                    backgroundFit="cover"
                />
            </div>

            {!(hideArrowsOnLast && isLast) && (
            <div className={`${baseClass}__arrows`}>
                <button
                    className={`${baseClass}__nav ${baseClass}__nav--left${isFirst ? ` ${baseClass}__nav--disabled` : ""}`}
                    onClick={() => {
                        if (isFirst) return;
                        onPrev();
                    }}
                    aria-label="Предыдущий"
                    aria-disabled={isFirst}
                />
                <button
                    className={`${baseClass}__nav ${baseClass}__nav--right${isLast ? ` ${baseClass}__nav--disabled` : ""}`}
                    onClick={() => {
                        if (isLast) {
                            onLastNext?.();
                            return;
                        }
                        onNext();
                    }}
                    aria-label="Следующий"
                    aria-disabled={isLast}
                />
            </div>
            )}

            {renderContent?.(active) ?? null}
        </div>
    );
};
