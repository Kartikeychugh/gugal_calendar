import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import "./calendar-view-selector.css";

export const CalendarViewSelector = () => {
  const dispatch = useDispatch();
  const setView = (view: number) => {
    dispatch({ type: "SET_VIEW", payload: view });
  };
  const { numberOfDays } = useSelector((state) => state.view);

  return (
    <div className="view-selector">
      {[
        { numberOfDays: 1, title: "Today" },
        { numberOfDays: 5, title: "Work Week" },
        { numberOfDays: 7, title: "Week" },
      ].map((view, key) => (
        <div
          key={key}
          onClick={() => setView(view.numberOfDays)}
          className={`view-pill ${
            numberOfDays === view.numberOfDays ? `selected-view-pill ` : ``
          }`}>
          {view.title}
        </div>
      ))}
    </div>
  );
};
