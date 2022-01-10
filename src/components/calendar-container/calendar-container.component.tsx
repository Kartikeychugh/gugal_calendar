import { CalendarEventGrid } from "../calendar-event-grid/calendar-event-grid.component";
import { CalendarGrid } from "../calendar-grid/calendar-grid.component";

import "./calendar-container.css";

export const CalendarContainer = () => {
  return (
    <div className="calendar-container">
      <CalendarGrid />
      <CalendarEventGrid />
    </div>
  );
};
