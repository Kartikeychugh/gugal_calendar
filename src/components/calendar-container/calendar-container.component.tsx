import { CalendarGrid } from "../calendar-grid/calendar-grid.component";
import { CalendarHeader } from "../calendar-header/calendar-header.component";

import "./calendar-container.css";

export const Calendar = () => {
  return (
    <div className="calendar">
      <CalendarContainer />
    </div>
  );
};

const CalendarContainer = () => {
  return (
    <div className="calendar-container">
      <CalendarHeader />
      <div className="calendar-scrollable-grid">
        <CalendarGrid />
      </div>
    </div>
  );
};
