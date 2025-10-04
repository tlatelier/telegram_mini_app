import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";

type AutoCarouselProps = {
  images: string[];
  hasMask?: boolean;
  intervalMs?: number;
  height?: number | string;
  backgroundFit?: "cover" | "contain";
  showControls?: boolean;
  className?: string;
};

export const AutoCarousel = ({
  images,
  intervalMs = 2500,
  hasMask = false,
  height = 500,
  backgroundFit = "cover",
  showControls = false,
  className,
}: AutoCarouselProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <Carousel
      slides={images}
      index={index}
      onChangeIndex={setIndex}
      loop={true}
      hasMask={hasMask}
      autoplayInterval={null}
      showControls={showControls}
      itemHeight={height}
      backgroundFit={backgroundFit}
      className={className}
    />
  );
};


