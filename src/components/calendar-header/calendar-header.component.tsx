import { useDispatch } from "../../redux/hooks/use-dispatch";
import {
  getToday,
  isSameDate,
  isWeekEnd,
} from "../../utils/get-current-week-dates";
import "./calendar-header.css";

export const CalendarHeader = (props: { daysToShow: string[] }) => {
  const today = getToday();
  const dispatch = useDispatch();
  const setView = (payload: string[]) => {
    dispatch({ type: "SET_VIEW", payload: payload });
  };

  return (
    <div className="header-container">
      <div className="header-gutter"></div>
      {props.daysToShow.map((date, i) => {
        return (
          <div
            onClick={() => setView([date])}
            key={i}
            style={{
              width: `calc(${100 / props.daysToShow.length}%)`,
              backgroundColor: isSameDate(new Date(date), today)
                ? "#EFF6FF"
                : isWeekEnd(new Date(date))
                ? "#f5f5f5"
                : "white",
              boxShadow:
                i + 1 === props.daysToShow.length
                  ? "inset 0px -1px 0px #e0e0e0"
                  : "inset -1px -1px 0px #e0e0e0",
            }}
            className="header-cell">
            <div className="header-cell-first-line">
              {new Date(date).toLocaleDateString("en-GB", { weekday: "short" })}
            </div>
            <div className="header-cell-second-line">
              {new Date(date).getDate()}
            </div>
          </div>
        );
      })}
    </div>
  );
};
