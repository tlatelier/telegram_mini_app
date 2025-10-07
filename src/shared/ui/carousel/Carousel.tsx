import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./carousel.less";

type CarouselProps = {
    slides: Array<string | JSX.Element>;
    index?: number;
    onChangeIndex?: (index: number) => void;
    loop?: boolean;
    hasMask?: boolean;
    autoplayInterval?: number | null;
    showControls?: boolean;
    className?: string;
    itemHeight?: number | string;
    backgroundFit?: "cover" | "contain";
};

const baseClass = "carousel";

export const Carousel = ({
    slides,
    index,
    onChangeIndex,
    loop = true,
    hasMask = false,
    autoplayInterval = null,
    showControls = true,
    className,
    itemHeight = 500,
    backgroundFit = "contain",
}: CarouselProps) => {
    const isControlled = typeof index === "number" && typeof onChangeIndex === "function";
    const [internalIndex, setInternalIndex] = useState(0);
    const activeIndex = isControlled ? (index as number) : internalIndex;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [slideWidth, setSlideWidth] = useState(0);

    const slidesCount = useMemo(() => slides.length, [slides.length]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const update = () => setSlideWidth(node.clientWidth);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(node);
        return () => ro.disconnect();
    }, []);

    const goTo = useCallback(
        (next: number) => {
            if (slidesCount === 0) return;
            let target = next;
            if (loop) {
                target = (next + slidesCount) % slidesCount;
            } else {
                target = Math.max(0, Math.min(next, slidesCount - 1));
            }
            if (isControlled) {
                (onChangeIndex as (i: number) => void)(target);
            } else {
                setInternalIndex(target);
            }
        },
        [slidesCount, loop, isControlled, onChangeIndex],
    );

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        if (!autoplayInterval || slidesCount <= 1) return;
        const id = setInterval(() => {
            next();
        }, autoplayInterval);
        return () => clearInterval(id);
    }, [autoplayInterval, slidesCount, next]);

    const transform = `translate3d(-${activeIndex * slideWidth}px, 0, 0)`;

    const startX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (dx > 50) prev();
        if (dx < -50) next();
        startX.current = null;
    };

    return (
        <div
            className={[baseClass, className].filter(Boolean).join(" ")}
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className={`${baseClass}__track`} style={{ transform }}>
                {slides.map((slide, i) => {
                    const isString = typeof slide === "string";
                    return (
                        <div
                            key={i}
                            className={`${baseClass}__item`}
                            style={{
                                height:
                                    typeof itemHeight === "number" ? `${itemHeight}px` : itemHeight,
                                backgroundImage: isString ? `url(${slide})` : undefined,
                                backgroundSize: isString ? backgroundFit : undefined,
                                backgroundRepeat: isString ? "no-repeat" : undefined,
                                backgroundPosition: isString ? "center" : undefined,
                            }}
                        >
                            {!isString ? slide : null}
                        </div>
                    );
                })}
            </div>

            {hasMask && <div className={`${baseClass}__mask`} />}

            {showControls && slidesCount > 1 && (
                <div className={`${baseClass}__arrows`}>
                    <button
                        className={`${baseClass}__nav ${baseClass}__nav--left`}
                        onClick={prev}
                        aria-label="Предыдущий"
                    />
                    <button
                        className={`${baseClass}__nav ${baseClass}__nav--right`}
                        onClick={next}
                        aria-label="Следующий"
                    />
                </div>
            )}
        </div>
    );
};
