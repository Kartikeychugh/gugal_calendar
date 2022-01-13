import { getWorkWeek } from "../../utils/get-current-week-dates";
import { CalendarSurface } from "../calendar-grid/calendar-grid.component";
import { CalendarHeader } from "../calendar-header/calendar-header.component";

import "./calendar-container.css";

export const Calendar = () => {
  return (
    <div className="calendar">
      <CalendarContainer daysToShow={getWorkWeek(5)} />
    </div>
  );
};

const CalendarContainer = (props: { daysToShow: Date[] }) => {
  return (
    <div className="calendar-container">
      <CalendarHeader daysToShow={props.daysToShow} />
      <div className="calendar-scrollable-grid">
        <CalendarSurface daysToShow={props.daysToShow} />
      </div>
    </div>
  );
};
