import { useSelector } from "../../redux/hooks/use-selector";
import { CalendarSurface } from "../calendar-grid/calendar-grid.component";
import { CalendarHeader } from "../calendar-header/calendar-header.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";

import "./calendar-container.css";

export const Calendar = (props: { cellSize: number }) => {
  const { dates } = useSelector((state) => state.view);
  return (
    <div className="calendar">
      <CalendarCommandBar />
      <CalendarContainer cellSize={props.cellSize} daysToShow={dates} />
    </div>
  );
};

const CalendarContainer = (props: {
  daysToShow: string[];
  cellSize: number;
}) => {
  return (
    <div className="calendar-container">
      <CalendarHeader daysToShow={props.daysToShow} />
      <div className="calendar-scrollable-grid">
        <CalendarSurface
          cellSize={props.cellSize}
          daysToShow={props.daysToShow}
        />
      </div>
    </div>
  );
};
