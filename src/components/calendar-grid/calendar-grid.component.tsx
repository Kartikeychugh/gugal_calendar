import { Box } from "@mui/material";
import { addDays, addHours, startOfToday } from "date-fns";
import { useEffect, useRef } from "react";
import { useCreateClientEvent } from "../../hooks/use-add-event";
import { useCalendarEvents } from "../../hooks/use-calendar-events";
import { useCurrentTime } from "../../hooks/use-current-time";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { useSelector } from "../../redux/hooks/use-selector";
import {
  getToday,
  isSameDate,
  isWeekEnd,
} from "../../utils/get-current-week-dates";
import { extractEventForDay } from "../../utils/get-day-event";
import { getViewDetails } from "../../utils/get-view-details";
import { CalendarEventColumn } from "../calendar-event-grid/calendar-event-grid.component";
import { CalendarGridTime } from "./calendar-grid-time";
import "./calendar-grid.css";

export const CalendarSurface = (props: { cellSize: number }) => {
  const events = useCalendarEvents();

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <CalendarGridTime cellSize={props.cellSize} />
      <CalendarGrid cellSize={props.cellSize} events={events} />
    </div>
  );
};

const CalendarGrid = (props: {
  cellSize: number;
  events: ICalendarEventItem[];
}) => {
  const { start } = useSelector((state) => state.window);
  const { fromDay, numberOfDays } = useSelector((state) => state.view);

  const view = getViewDetails(addDays(start, fromDay), numberOfDays);

  return (
    <div className="calendar-grid">
      {/* <TimeMarker
        cellSize={props.cellSize}
        view={numberOfDays}
        diff={startOfToday().getDay() - fromDay}
      /> */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
        }}>
        {view.week.map((day, i) => (
          <CalendarColumn
            cellSize={props.cellSize}
            events={props.events}
            lastColumn={i + 1 === numberOfDays}
            datetime={day}
            key={i}
            view={numberOfDays}
          />
        ))}
      </Box>
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
          100 * totalMarkerLengthFraction
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
  datetime: Date;
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
  datetime: Date;
  view: number;
  cellSize: number;
}) => {
  const cells = [];
  const createClientEvent = useCreateClientEvent();
  for (let i = 0; i < 24; i++) {
    cells.push(
      <Box
        onClick={(e) => {
          createClientEvent(
            addHours(props.datetime, i),
            addHours(props.datetime, i + 1)
          );
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
