import { bem } from "../../../shared/lib/utils/bem.ts";
import type { TripDataType } from "../model/type.h";

const tripCardClass = "tripCard";

type TripCardProps = TripDataType & {
    onClick?: () => void;
};

const TripCard = (props: TripCardProps) => {
    const { date, background, destination, isActive, status: statusProp, onClick } = props;

    const statusKey = statusProp ?? (isActive ? "upcoming" : "past");
    const status =
        statusKey === "wip"
            ? { text: "В проработке", mod: "wip" }
            : statusKey === "upcoming"
              ? { text: "Идёт набор", mod: "upcoming" }
              : { text: "В воспоминаниях", mod: "past" };

    const cardClassName = `${tripCardClass} ${tripCardClass}--${status.mod}`;

    return (
        <div
            style={{ backgroundImage: `url(${background})` }}
            className={cardClassName}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onClick?.();
                }
            }}
        >
            <span
                className={`${tripCardClass}__badge ${tripCardClass}__badge--${status.mod}`}
                aria-label={status.text}
            >
                {status.text}
            </span>
            <span className={bem(tripCardClass, "destination")}>{destination}</span>
            <span className={bem(tripCardClass, "date")}>{date}</span>
        </div>
    );
};

export { TripCard };
