import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import { getWorkWeek } from "../../utils/get-current-week-dates";
import "./calendar-view-selector.css";

export const CalendarViewSelector = () => {
  const dispatch = useDispatch();
  const setView = (view: string[]) => {
    dispatch({ type: "SET_VIEW", payload: view });
  };
  const { daysToView } = useSelector((state) => state.view);

  return (
    <div className="view-selector">
      {[
        { numberOfDays: 5, title: "Work Week" },
        { numberOfDays: 7, title: "Week" },
      ].map((view, key) => (
        <div
          key={key}
          onClick={() => setView(getWorkWeek(view.numberOfDays))}
          className={`view-pill ${
            daysToView.length === view.numberOfDays ? `selected-view-pill ` : ``
          }`}>
          {view.title}
        </div>
      ))}
    </div>
  );
};
