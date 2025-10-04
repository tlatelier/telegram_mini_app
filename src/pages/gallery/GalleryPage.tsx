import { useMemo, useState } from "react";
import "./gallery.less";

const DESTINATIONS: Record<string, string> = {
  uar: "ЮАР",
  altai: "Алтай",
  japan: "Япония",
  baikal: "Байкал",
  murmansk: "Мурманск",
  kamchatka: "Камчатка",
  uzbekistan: "Узбекистан",
  azerbaijan: "Азербайджан",
};

const GLOB_OPTIONS = { eager: true, import: "default" } as const;

// Собираем изображения по направлениям (URL строками)
const SOURCES = {
  uar: import.meta.glob("../../../public/images/gallery/uar/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  altai: import.meta.glob("../../../public/images/gallery/altai/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  japan: import.meta.glob("../../../public/images/gallery/japan/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  baikal: import.meta.glob("../../../public/images/gallery/baikal/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  murmansk: import.meta.glob("../../../public/images/gallery/murmansk/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  kamchatka: import.meta.glob("../../../public/images/gallery/kamchatka/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  azerbaijan: import.meta.glob("../../../public/images/gallery/azerbaijan/*.webp", { eager: true, import: "default" }) as Record<string, string>,
  uzbekistan: import.meta.glob("../../../public/images/gallery/uzbekistan/*.webp", { eager: true, import: "default" }) as Record<string, string>,
};

const buildSortedUrls = (modules: Record<string, string>): string[] =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)
    .filter(Boolean);

const GalleryPage = () => {
  const [dest, setDest] = useState<string | "all">("all");
  const [open, setOpen] = useState<null | "year" | "dest">(null);

  const imagesByDestination = useMemo(() => {
    return Object.fromEntries(
      Object.entries(SOURCES).map(([key, modules]) => [
        key,
        buildSortedUrls(modules),
      ])
    ) as Record<string, string[]>;
  }, []);

  const allImages = useMemo(() => {
    return Object.values(imagesByDestination).flat();
  }, [imagesByDestination]);

  const filtered = useMemo(() => {
    if (dest === "all") {
      return allImages;
    }

    return imagesByDestination[dest] ?? [];
  }, [allImages, imagesByDestination, dest]);

  return (
    <div className="galleryPage">
      <div className="galleryPage__grid">
        {filtered.slice(0, 50).map((image) => (
          <div
            key={image}
            className={"galleryPage__item"}
          >
            <img
              alt={image}
              src={image}
              loading="lazy"
              className="galleryPage__img"
            />
          </div>
        ))}
      </div>

      <div className="galleryPage__filtersFixed">
        <button
          className="button galleryPage__filterBtn"
          onClick={() => setOpen(open === "dest" ? null : "dest")}
        >
          <svg
            className="galleryPage__filterIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
          {dest === "all" ? "Направление" : DESTINATIONS[dest] ?? dest}
        </button>
      </div>

      {open === "dest" && (
        <div className="galleryPage__dropdown" onClick={() => setOpen(null)}>
          {Object.entries(DESTINATIONS).map(([ key, value]) => (
              <div
                  key={key}
                  className={`galleryPage__option ${dest === key ? "galleryPage__option--active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDest(key);
                    setOpen(null);
                  }}
              >
                {value}
              </div>
          ))}
          <div
            className={`galleryPage__option ${
              dest === "all" ? "galleryPage__option--active" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setDest("all");
              setOpen(null);
            }}
          >
            Все направления
          </div>
        </div>
      )}
    </div>  
  );
};

export { GalleryPage };
