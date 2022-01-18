import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAddClientEvent } from "../../hooks/use-add-event";
import { useCalendarEvents } from "../../hooks/use-calendar-events";
import { useCurrentTime } from "../../hooks/use-current-time";
import { useSelector } from "../../redux/hooks/use-selector";
import {
  getToday,
  isSameDate,
  isWeekEnd,
} from "../../utils/get-current-week-dates";
import { extractEventForDay } from "../../utils/get-day-event";
import { CalendarEventColumn } from "../calendar-event-grid/calendar-event-grid.component";
import { CalendarGridTime } from "./calendar-grid-time";
import "./calendar-grid.css";

export const CalendarSurface = (props: {
  cellSize: number;
  daysToShow: string[];
}) => {
  return (
    <div style={{ position: "absolute", width: "100%", display: "flex" }}>
      <CalendarGridTime cellSize={props.cellSize} />
      <CalendarGrid cellSize={props.cellSize} daysToShow={props.daysToShow} />
    </div>
  );
};

const CalendarGrid = (props: { cellSize: number; daysToShow: string[] }) => {
  const events = useCalendarEvents();

  return (
    <div className="calendar-grid">
      <TimeMarker
        cellSize={props.cellSize}
        view={props.daysToShow.length}
        diff={getToday().getDay() - new Date(props.daysToShow[0]).getDay()}
      />
      {props.daysToShow.map((day, i) => (
        <CalendarColumn
          cellSize={props.cellSize}
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

const TimeMarker = (props: {
  view: number;
  diff: number;
  cellSize: number;
}) => {
  const time = useCurrentTime();
  const ref: any = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  let totalMarkerLengthFraction;
  let solidMarrkerLengthFraction;
  let _diff = props.diff < 0 ? 6 : props.diff;

  if (_diff < 0) {
    _diff = _diff + props.view;
    totalMarkerLengthFraction = (_diff + 1) / props.view;
    solidMarrkerLengthFraction = _diff / (_diff + 1);
  } else if (_diff >= props.view) {
    totalMarkerLengthFraction = 1;
    solidMarrkerLengthFraction = 1;
  } else {
    totalMarkerLengthFraction = (_diff + 1) / props.view;
    solidMarrkerLengthFraction = _diff / (_diff + 1);
  }

  let solidWidth = solidMarrkerLengthFraction * 100;
  let dottedWiddth = 100 - solidWidth;

  return (
    <div
      ref={ref}
      style={{
        top: `${(props.cellSize / 60) * time}px`,
        width: `calc(${100 * totalMarkerLengthFraction}% - ${
          75 * totalMarkerLengthFraction
        }px)`,
      }}
      className="time-marker-container">
      <div
        style={{ width: `${solidWidth}%` }}
        className="solid-time-marker"></div>
      <div
        style={{ width: `${dottedWiddth}%` }}
        className="dotted-time-marker"></div>
    </div>
  );
};

const CalendarColumn = (props: {
  datetime: string;
  events: CalendarEventItem[] | undefined;
  lastColumn: boolean;
  view: number;
  cellSize: number;
}) => {
  return (
    <div className="grid-column-holders">
      <CalendarEventColumn
        cellSize={props.cellSize}
        view={props.view}
        events={extractEventForDay(props.events, props.datetime)}
      />
      <CalendarGridColumn
        cellSize={props.cellSize}
        view={props.view}
        datetime={props.datetime}
        lastColumn={props.lastColumn}
      />
    </div>
  );
};

const CalendarGridColumn = (props: {
  lastColumn: boolean;
  datetime: string;
  view: number;
  cellSize: number;
}) => {
  const cells = [];
  const addClientEvent = useAddClientEvent();
  const { client = [] } = useSelector((state) => state.events);
  for (let i = 0; i < 24; i++) {
    cells.push(
      <Box
        onClick={(e) => {
          // e.stopPropagation();
          if (client && client.length) {
            console.log("already open");
            return;
          }

          const start = new Date(props.datetime);
          const end = new Date(props.datetime);
          start.setHours(i);
          end.setHours(i + 1);

          addClientEvent(start, end, (e as any).pageX, (e as any).pageY);
          console.log(e);
        }}
        key={i}
        style={{
          height: `${props.cellSize}px`,
          boxShadow:
            i === 23
              ? props.lastColumn
                ? "none"
                : "inset -1px 0px 0px #e0e0e0"
              : props.lastColumn
              ? "inset 0px -1px 0px #e0e0e0"
              : "inset -1px -1px 0px #e0e0e0",
        }}
        className={`grid-cell ${
          isSameDate(new Date(props.datetime), getToday())
            ? "same-day"
            : isWeekEnd(new Date(props.datetime))
            ? "weekend"
            : ""
        }`}></Box>
    );
  }
  return <div className="grid-column">{cells}</div>;
};
