import React from "react";
import { useEffect, useRef, useState } from "react";
import { useAddEvent } from "../../hooks/use-add-event";
import { useCalendarEvents } from "../../hooks/use-calendar-events";
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
        zIndex: 1,
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
  const [state, setState] = useState({
    dragged: false,
    captureMouseMove: false,
    active: false,
    from: 0,
    to: 0,
  });

  const fromRef = useRef(0);
  const toRef = useRef(0);

  for (let i = 0; i < 24; i++) {
    cells.push(
      <div
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
        }`}></div>
    );
  }
  return (
    <div
      className="grid-column"
      onMouseMove={(e) => {
        if (state.captureMouseMove) {
          toRef.current = (e.nativeEvent as any).layerY;

          setState({
            ...state,
            dragged: true,
            from: adjustToNearestInterval(fromRef.current, props.cellSize, 4),
            to: adjustToNearestInterval(toRef.current, props.cellSize, 4),
          });
        }
      }}
      onMouseDown={(e) => {
        fromRef.current = (e.nativeEvent as any).layerY;

        setState({ ...state, captureMouseMove: true });
      }}
      onMouseUp={(e) => {
        toRef.current = (e.nativeEvent as any).layerY;

        if (state.active) {
          console.log("sorry already active!");

          fromRef.current = 0;
          toRef.current = 0;

          setState({
            ...state,
            active: false,
            captureMouseMove: false,
            from: fromRef.current,
            to: toRef.current,
          });
        } else if (state.dragged && toRef.current - fromRef.current > 2) {
          console.log("dragged");
          setState({
            ...state,
            active: true,
            dragged: false,
            captureMouseMove: false,
            from: adjustToNearestInterval(fromRef.current, props.cellSize, 4),
            to: adjustToNearestInterval(toRef.current, props.cellSize, 4),
          });
        } else {
          console.log("clicked");
          setState({
            ...state,
            active: true,
            captureMouseMove: false,
            from: adjustToNearestInterval(fromRef.current, props.cellSize, 1),
            to:
              adjustToNearestInterval(toRef.current, props.cellSize, 1) +
              props.cellSize,
          });
        }
      }}>
      {state.active ? (
        <DragEventHolder
          datetime={props.datetime}
          cellSize={props.cellSize}
          to={state.to}
          from={state.from}
          view={props.view}
        />
      ) : null}
      {cells}
    </div>
  );
};

const DragEventHolder = React.memo(
  (props: {
    view: number;
    from: number;
    to: number;
    cellSize: number;
    datetime: string;
  }) => {
    const { view, to, from, cellSize } = props;

    const y1 = adjustToNearestInterval(from, cellSize, 4);
    const y2 = adjustToNearestInterval(to, cellSize, 4);
    console.log("updated");

    let s = Math.floor(y1 / cellSize);
    const start = new Date(props.datetime);
    start.setHours(s);
    s = (y1 % props.cellSize) / (props.cellSize / 60);
    start.setMinutes(s);

    let t = Math.floor(y2 / cellSize);
    const end = new Date(props.datetime);
    end.setHours(t);
    t = (y2 % props.cellSize) / (props.cellSize / 60);
    end.setMinutes(t);

    const addEvent = useAddEvent();

    return (
      <div
        className="create-event-holder"
        style={{
          width: `calc(${100 / view}% - ${75 / view}px)`,
          height: `${y2 - y1}px`,
          top: `${y1}px`,
        }}></div>
    );
  }
);

const adjustToNearestInterval = (
  pos: number,
  cellSize: number,
  intervalFactor: number
) => {
  return pos - (pos % (cellSize / intervalFactor));
};

const convert = (from: number, to: number, cellSize: number) => {
  const y1 = adjustToNearestInterval(from, cellSize, 4);
  const y2 = adjustToNearestInterval(to, cellSize, 4);

  return y2 - y1;
};
