import { useMemo, useState } from "react";
import "./gallery.less";

type Photo = {
  id: string;
  src: string;
  year: number;
  destination: string; // e.g. "Милан", "Камчатка"
  span?: { rows?: number; cols?: number };
};

const demoPhotos: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format",
    year: 2024,
    destination: "Италия",
    span: { rows: 36, cols: 2 },
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format",
    year: 2023,
    destination: "Камчатка",
    span: { rows: 24 },
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200&auto=format",
    year: 2024,
    destination: "Италия",
    span: { rows: 28 },
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format",
    year: 2022,
    destination: "Франция",
    span: { rows: 32, cols: 2 },
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format",
    year: 2023,
    destination: "Камчатка",
    span: { rows: 20 },
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format",
    year: 2022,
    destination: "Франция",
    span: { rows: 24 },
  },
];

const GalleryPage = () => {
  const [year, setYear] = useState<number | "all">("all");
  const [dest, setDest] = useState<string | "all">("all");
  const [open, setOpen] = useState<null | "year" | "dest">(null);

  const years = useMemo(
    () =>
      Array.from(new Set(demoPhotos.map((p) => p.year))).sort((a, b) => b - a),
    []
  );
  const destinations = useMemo(
    () => Array.from(new Set(demoPhotos.map((p) => p.destination))),
    []
  );

  const filtered = useMemo(
    () =>
      demoPhotos.filter(
        (p) =>
          (year === "all" || p.year === year) &&
          (dest === "all" || p.destination === dest)
      ),
    [year, dest]
  );

  return (
    <div className="galleryPage">
      <div className="galleryPage__grid">
        {filtered.slice(0, 50).map((p) => (
          <div
            key={p.id}
            className={[
              "galleryPage__item",
              p.span?.rows
                ? `galleryPage__rows-${p.span.rows}`
                : "galleryPage__rows-24",
              p.span?.cols === 2 ? "galleryPage__cols-2" : "",
            ]
              .join(" ")
              .trim()}
          >
            <img
              className="galleryPage__img"
              src={p.src}
              alt={p.destination}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="galleryPage__filtersFixed">
        <button
          className="button galleryPage__filterBtn"
          onClick={() => setOpen(open === "year" ? null : "year")}
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
          {year === "all" ? "Год" : year}
        </button>
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
          {dest === "all" ? "Направление" : dest}
        </button>
      </div>

      {open === "year" && (
        <div className="galleryPage__dropdown" onClick={() => setOpen(null)}>
          <div
            className={`galleryPage__option ${
              year === "all" ? "galleryPage__option--active" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setYear("all");
              setOpen(null);
            }}
          >
            Все годы
          </div>
          {years.map((y) => (
            <div
              key={y}
              className={`galleryPage__option ${
                year === y ? "galleryPage__option--active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setYear(y);
                setOpen(null);
              }}
            >
              {y}
            </div>
          ))}
        </div>
      )}
      {open === "dest" && (
        <div className="galleryPage__dropdown" onClick={() => setOpen(null)}>
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
          {destinations.map((d) => (
            <div
              key={d}
              className={`galleryPage__option ${
                dest === d ? "galleryPage__option--active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setDest(d);
                setOpen(null);
              }}
            >
              {d}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { GalleryPage };
