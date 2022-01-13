import {
  getToday,
  isSameDate,
  isWeekEnd,
} from "../../utils/get-current-week-dates";
import "./calendar-header.css";

export const CalendarHeader = (props: { daysToShow: Date[] }) => {
  const today = getToday();

  return (
    <div className="header-container">
      <div className="header-gutter"></div>
      {props.daysToShow.map((date, i) => {
        return (
          <div
            key={i}
            style={{
              width: `calc(${100 / props.daysToShow.length}%)`,
              backgroundColor: isSameDate(date, today)
                ? "#EFF6FF"
                : isWeekEnd(date)
                ? "#f5f5f5"
                : "white",
              boxShadow:
                i + 1 === props.daysToShow.length
                  ? "inset 0px -1px 0px #e0e0e0"
                  : "inset -1px -1px 0px #e0e0e0",
            }}
            className="header-cell">
            <div className="header-cell-first-line">
              {date.toLocaleDateString("en-GB", { weekday: "short" })}
            </div>
            <div className="header-cell-second-line">{date.getDate()}</div>
          </div>
        );
      })}
    </div>
  );
};
