import { useEffect, useMemo, useState } from "react";
import { Button } from "../../shared/ui/button/Button";
import { OverlayCarousel } from "../../features/overlay/OverlayCarousel";
import "./program-overlay.less";

const cls = "programOverlay";

export type ProgramOverlayDay = {
  title: string;
  description: string;
  photo?: string;
};

type ProgramOverlayProps = {
  days: ProgramOverlayDay[];
  active: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export const ProgramOverlay = ({
  days,
  active,
  onClose,
  onPrev,
  onNext,
}: ProgramOverlayProps) => {
  const [displayIndex, setDisplayIndex] = useState<number>(active);

  useEffect(() => {
    // Синхронизация внешнего индекса (только для реальных дней)
    if (active <= days.length - 1) {
      setDisplayIndex(active);
    }
  }, [active, days.length]);

  const images = useMemo(() => {
    // Финальный кадр — используем фото последнего (или первого) дня
    const finalImage = days[days.length - 1]?.photo ?? days[0]?.photo ?? "";
    return [...days.map((d) => d.photo ?? ""), finalImage];
  }, [days]);

  const isFinal = displayIndex === days.length;
  const current = days[Math.min(displayIndex, days.length - 1)];

  const renderDescription = (text?: string) => {
    const value = (text ?? "").trim();
    if (!value) return null;
    // Если есть явные переносы строк — считаем их абзацами
    if (/\n/.test(value)) {
      return (
        <>
          {value
            .split(/\n+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, i) => (
              <p key={i} className={`${cls}__p`}>
                {line}
              </p>
            ))}
        </>
      );
    }
    // Иначе — дробим на предложения и показываем маркированным списком
    const sentences = (value.match(/[^.!?;]+[.!?;]?/g) ?? [value])
      .map((s) => s.trim())
      .filter(Boolean);

    if (sentences.length === 0) return null;

    let items: string[] = sentences;
    if (sentences.length > 3) {
      const first = sentences[0];
      const second = sentences[1];
      const rest = sentences.slice(2).join(" ").replace(/\s+/g, " ");
      items = [first, second, rest];
    }

    return (
      <ul className={`${cls}__list`}>
        {items.map((s, i) => (
          <li key={i} className={`${cls}__li`}>
            {s}
          </li>
        ))}
      </ul>
    );
  };

  const handlePrev = () => {
    if (isFinal) {
      setDisplayIndex(days.length - 1);
      return;
    }
    onPrev();
  };

  const handleNext = () => {
    if (displayIndex === days.length - 1) {
      // Переход на финальный экран
      setDisplayIndex(days.length);
      return;
    }
    onNext();
  };

  const onChange = (i: number) => {
    // Свайп влево/вправо
    if (i === displayIndex + 1) {
      handleNext();
    } else if (i === displayIndex - 1) {
      handlePrev();
    } else {
      // Прямой переход (редкий кейс) — нормализуем
      if (i === days.length) {
        setDisplayIndex(days.length);
      } else if (i >= 0 && i < days.length) {
        // Подымаем наверх для согласованности
        if (i > displayIndex) onNext();
        if (i < displayIndex) onPrev();
      }
    }
  };

  return (
    <div className={`${cls}`}>
      <OverlayCarousel
        images={images}
        active={displayIndex}
        onChange={onChange}
        onPrev={handlePrev}
        onNext={handleNext}
        renderContent={() => (
          <>
            {!isFinal && <div className={`${cls}__mask`} />}
            {isFinal && <div className={`${cls}__finalMask`} />}
            {!isFinal && (
              <div className={`${cls}__content`}>
                <div className={`${cls}__meta`}>{`День ${displayIndex + 1} — ${
                  current?.title ?? ""
                }`}</div>
                <div className={`${cls}__text`}>{renderDescription(current?.description)}</div>
              </div>
            )}
            {!isFinal && (
              <div className={`${cls}__actions`}>
                <div className={`${cls}__btn ${cls}__btn--secondary`}>
                  <Button text="Закрыть" callback={onClose} />
                </div>
              </div>
            )}
            {isFinal && (
              <div className={`${cls}__final`}>
                <div className={`${cls}__finalTitle`}>
                  Что вас ждёт в этой поездке
                </div>
                <ul className={`${cls}__finalList`}>
                  <li className={`${cls}__finalItem`}>Продуманная программа по ключевым локациям</li>
                  <li className={`${cls}__finalItem`}>Сильные эмоции и редкие опыты без спешки</li>
                  <li className={`${cls}__finalItem`}>Комфортное размещение и логистика</li>
                  <li className={`${cls}__finalItem`}>Забота и сопровождение гида 24/7</li>
                </ul>
              </div>
            )}
            {isFinal && (
              <div className={`${cls}__actions`}>
                <div className={`${cls}__btn ${cls}__btn--secondary`}>
                  <Button text="Закрыть" callback={onClose} />
                </div>
                <div className={`${cls}__btn ${cls}__btn--primary`}>
                  <Button
                    text="Поехали"
                    callback={() => {
                      onClose();
                      document
                        .getElementById("lead-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};
