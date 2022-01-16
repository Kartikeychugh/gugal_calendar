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

export const CalendarSurface = (props: { daysToShow: string[] }) => {
  return (
    <div style={{ position: "absolute", width: "100%", display: "flex" }}>
      <CalendarGridTime />
      <CalendarGrid daysToShow={props.daysToShow} />
    </div>
  );
};

const CalendarGrid = (props: { daysToShow: string[] }) => {
  const events = useCalendarEvents();

  return (
    <div className="calendar-grid">
      <TimeMarker
        view={props.daysToShow.length}
        diff={getToday().getDay() - new Date(props.daysToShow[0]).getDay()}
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
        top: `${2 * time}px`,
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
}) => {
  return (
    <div className="grid-column-holders">
      <CalendarEventColumn
        view={props.view}
        events={extractEventForDay(props.events, props.datetime)}
      />
      <CalendarGridColumn
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
}) => {
  const cells = [];
  const [yy, setYY] = useState({ y1: 0, y2: 0 });
  const [capture, setCapture] = useState(false);
  const addEvent = useAddEvent();

  const upRef = useRef(0);
  const downRef = useRef(0);
  for (let i = 0; i < 24; i++) {
    cells.push(
      <div
        onClick={() => {
          // const start = new Date(props.datetime);
          // start.setHours(i);
          // const end = new Date(props.datetime);
          // end.setHours(i + 1);
          // addEvent(start, end);
        }}
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
      // onMouseMove={(e) => {
      //   if (capture) {
      //     downRef.current =
      //       (e.nativeEvent as any).layerY -
      //       ((e.nativeEvent as any).layerY % 30);
      //     setYY({ y1: upRef.current, y2: downRef.current });
      //   }
      // }}
      // onMouseDown={(e) => {
      //   upRef.current =
      //     (e.nativeEvent as any).layerY - ((e.nativeEvent as any).layerY % 30);

      //   setCapture(true);
      // }}
      // onMouseUp={(e) => {
      //   setCapture(false);

      //   if (downRef.current - upRef.current < 5) {
      //   } else {
      //     setYY({ y1: 0, y2: 0 });

      //     const startTiming = {
      //       hour: Math.floor(yy.y1 / 120),
      //       minuutes: (yy.y1 % 120) / 2,
      //     };

      //     const endTiming = {
      //       hour: Math.floor(yy.y2 / 120),
      //       minuutes: (yy.y2 % 120) / 2,
      //     };
      //     const start = new Date(props.datetime);
      //     start.setHours(startTiming.hour);
      //     start.setMinutes(startTiming.minuutes);

      //     const endd = new Date(props.datetime);
      //     endd.setHours(endTiming.hour);
      //     endd.setMinutes(endTiming.minuutes);

      //     addEvent(start, endd);
      //   }
      // }}
    >
      <div
        style={{
          width: `calc(${100 / props.view}% - ${75 / props.view}px)`,
          zIndex: 1,
          pointerEvents: "none",
          backgroundColor: "blueviolet",
          height: `${yy.y2 - yy.y1}px`,
          position: "absolute",
          top: `${yy.y1}px`,
        }}></div>
      {cells}
    </div>
  );
};
