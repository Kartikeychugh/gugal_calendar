import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import { getToday, getWorkWeek } from "../../utils/get-current-week-dates";
import "./calendar-view-selector.css";

export const CalendarViewSelector = () => {
  const dispatch = useDispatch();
  const setView = (dates: string[]) => {
    dispatch({ type: "SET_VIEW", payload: { dates } });
  };
  const { dates } = useSelector((state) => state.view);

  return (
    <div className="view-selector">
      {[
        { dates: getWorkWeek(5), title: "Work Week" },
        { dates: getWorkWeek(7), title: "Week" },
      ].map((view, key) => (
        <div
          key={key}
          onClick={() => setView(view.dates)}
          className={`view-pill ${
            dates.length === view.dates.length ? `selected-view-pill ` : ``
          }`}>
          {view.title}
        </div>
      ))}
    </div>
  );
};
