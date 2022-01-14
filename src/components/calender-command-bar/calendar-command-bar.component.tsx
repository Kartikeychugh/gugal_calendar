import { CalendarViewSelector } from "../calendar-view-selector/calendar-view-selector.component";
import "./calendar-command-bar.css";

export const CalendarCommandBar = () => {
  return (
    <div className="calendar-command-bar">
      <CalendarViewSelector />
      <CalendarUpdates />
    </div>
  );
};

const CalendarUpdates = () => {
  return <div className="calendar-update">Syncing with Google...</div>;
};
