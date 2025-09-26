import { useEffect, useRef, type ReactNode } from "react";
import "./overlay.less";

const baseClass = "overlay";

interface OverlayProps {
  active: number;
  slides: ReactNode[];
  onPrev: () => void;
  onNext: () => void;
  renderContent?: (activeIndex: number) => ReactNode;
}

export const Overlay = ({
  active,
  slides,
  onPrev,
  onNext,
  renderContent,
}: OverlayProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translateX(-${active * 100}%)`;
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) onPrev();
    if (dx < -50) onNext();
    startX.current = null;
  };

  return (
    <div
      className={baseClass}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={`${baseClass}__slider`}>
        <div className={`${baseClass}__track`} ref={trackRef}>
          {slides.map((slide, index) => (
            <div key={index} className={`${baseClass}__slide`}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className={`${baseClass}__arrows`}>
        <button
          className={`${baseClass}__nav ${baseClass}__nav--left`}
          onClick={onPrev}
          aria-label="Предыдущий"
        />
        <button
          className={`${baseClass}__nav ${baseClass}__nav--right`}
          onClick={onNext}
          aria-label="Следующий"
        />
      </div>

      {renderContent?.(active) ?? null}
    </div>
  );
};
