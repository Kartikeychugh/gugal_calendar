import { useMemo } from "react";
import { useSelector } from "../../redux/hooks/use-selector";
import { getWorkWeek } from "../../utils/get-current-week-dates";
import { CalendarSurface } from "../calendar-grid/calendar-grid.component";
import { CalendarHeader } from "../calendar-header/calendar-header.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";

import "./calendar-container.css";

export const Calendar = () => {
  const { numberOfDays } = useSelector((state) => state.view);
  return (
    <div className="calendar">
      <CalendarCommandBar />
      <CalendarContainer
        daysToShow={useMemo(() => getWorkWeek(numberOfDays), [numberOfDays])}
      />
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
