import { Button } from "../../shared/ui/button/Button";
import { Overlay } from "../../features/overlay/Overlay";
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
  const current = days[active];

  return (
    <div className={`${cls}`}>
      <Overlay
        active={active}
        slides={days.map((d) => (
          <>
            <div
              className={`${cls}__bg`}
              style={{ backgroundImage: `url(${d.photo ?? ""})` }}
            />
            <div className={`${cls}__mask`} />
          </>
        ))}
        onPrev={onPrev}
        onNext={onNext}
        renderContent={() => (
          <>
            <div className={`${cls}__content`}>
              <div className={`${cls}__meta`}>{`День ${active + 1} — ${
                current?.title ?? ""
              }`}</div>
              <div className={`${cls}__text`}>{current?.description}</div>
            </div>
            <div className={`${cls}__actions`}>
              <div className={`${cls}__btn ${cls}__btn--secondary`}>
                <Button text="Назад" callback={onClose} />
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
          </>
        )}
      />
    </div>
  );
};
