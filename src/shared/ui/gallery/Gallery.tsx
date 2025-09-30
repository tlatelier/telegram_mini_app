import { useEffect, useState, useRef } from "react";
import "./gallery.less";

const cls = "gallery";

export type GalleryProps = { images: string[]; showControls?: boolean };

export const Gallery = ({ images, showControls = true }: GalleryProps) => {
  const [index, setIndex] = useState(() => Math.max(0, images.length - 1));
  const next = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const prev = () => setIndex((i) => (i + 1) % images.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    setIndex(Math.max(0, images.length - 1));
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const id = setInterval(() => {
      setIndex((i) => (i - 1 + images.length) % images.length);
    }, 2000);

    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    };

    const update = () => setSlideWidth(node.clientWidth);

    update();

    const ro = new ResizeObserver(() => update());

    ro.observe(node);

    return () => ro.disconnect();
  }, []);

  const transform = `translate3d(-${index * slideWidth}px, 0, 0)`;

  return (
    <div ref={containerRef} className={cls}>
      <div className={`${cls}__track`} style={{ transform }}>
        {images.map((src, i) => (
          <div
            key={i}
            className={`${cls}__item`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      {showControls && images.length > 1 && (
        <>
          <div className={`${cls}__controls`}>
            <button
              className={`${cls}__btn`}
              onClick={prev}
              aria-label="Предыдущий"
            >
              ‹
            </button>
            <button
              className={`${cls}__btn`}
              onClick={next}
              aria-label="Следующий"
            >
              ›
            </button>
          </div>
          <div className={`${cls}__bullets`}>
            {images.map((_, i) => (
              <span
                key={i}
                className={`${cls}__bullet${
                  i === index ? ` ${cls}__bullet--active` : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
