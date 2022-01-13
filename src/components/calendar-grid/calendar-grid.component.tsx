import { getTabId } from "@mui/material";
import { useCalendarEvents } from "../../firebase/api/hooks/use-calendar-events";
import { useCurrentTime } from "../../hooks/use-current-time";
import {
  getToday,
  isSameDate,
  isWeekEnd,
} from "../../utils/get-current-week-dates";
import { extractEventForDay } from "../../utils/get-day-event";
import { CalendarEventColumn } from "../calendar-event-grid/calendar-event-grid.component";
import { CalendarGridTime } from "./calendar-grid-time";
import "./calendar-grid.css";

export const CalendarSurface = (props: { daysToShow: Date[] }) => {
  return (
    <div style={{ position: "absolute", width: "100%", display: "flex" }}>
      <CalendarGridTime />
      <CalendarGrid daysToShow={props.daysToShow} />
    </div>
  );
};

const CalendarGrid = (props: { daysToShow: Date[] }) => {
  const events = useCalendarEvents();
  console.log({ events });

  return (
    <div className="calendar-grid">
      <TimeMarker
        view={props.daysToShow.length}
        diff={getToday().getDay() - props.daysToShow[0].getDay()}
      />
      {props.daysToShow.map((day, i) => (
        <CalendarColumn
          events={events}
          lastColumn={i + 1 === props.daysToShow.length}
          datetime={day}
          key={i}
          view={props.daysToShow.length}
        />
      ))}
    </div>
  );
};

const TimeMarker = (props: { view: number; diff: number }) => {
  const time = useCurrentTime();
  const today = getToday().getDay();
  let _diff = props.diff < 0 ? 6 : props.diff;

  return (
    <div
      style={{
        top: `${2 * time}px`,
      }}
      className="time-marker-container">
      <div
        style={{ width: `${(_diff * 100) / props.view}%` }}
        className="solid-time-marker"></div>
      <div
        style={{ width: `${100 / props.view}%` }}
        className="dotted-time-marker"></div>
    </div>
  );
};

const CalendarColumn = (props: {
  datetime: Date;
  events: CalendarEventItem[] | undefined;
  lastColumn: boolean;
  view: number;
}) => {
  return (
    <div className="grid-column-holders">
      <CalendarEventColumn
        view={props.view}
        events={extractEventForDay(props.events, props.datetime)}
      />
      <CalendarGridColumn
        datetime={props.datetime}
        lastColumn={props.lastColumn}
      />
    </div>
  );
};

const CalendarGridColumn = (props: { lastColumn: boolean; datetime: Date }) => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <div
        key={i}
        style={{
          boxShadow:
            i === 23
              ? props.lastColumn
                ? "none"
                : "inset -1px 0px 0px #e0e0e0"
              : props.lastColumn
              ? "inset 0px -1px 0px #e0e0e0"
              : "inset -1px -1px 0px #e0e0e0",
          backgroundColor: isSameDate(props.datetime, getToday())
            ? "#EFF6FF"
            : isWeekEnd(props.datetime)
            ? "#f5f5f5"
            : "white",
        }}
        className="grid-cell"></div>
    );
  }
  return <div className="grid-column">{cells}</div>;
};
