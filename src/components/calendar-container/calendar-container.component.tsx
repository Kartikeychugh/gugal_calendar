import { CalendarGrid } from "../calendar-grid/calendar-grid.component";
import { CalendarHeader } from "../calendar-header/calendar-header.component";

import "./calendar-container.css";

export const CalendarContainer = () => {
  return (
    <div className="calendar-surface">
      <div className="calendar-container">
        <CalendarHeader />
        <div className="scrollable-grid">
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
};
