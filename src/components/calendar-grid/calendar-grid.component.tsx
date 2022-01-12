import {
  CalendarEventColumn,
} from "../calendar-event-grid/calendar-event-grid.component";
import { CalendarGridTime } from "./calendar-grid-time";
import "./calendar-grid.css";

export const CalendarGrid = () => {
  const columns = [];

  for (let i = 0; i < 5; i++) {
    const today = new Date();
    const dayNumber = today.getDay();
    const firstDateOfColumn = today.setDate(
      today.getDate() - dayNumber + 1 + i
    );
    columns.push(
      <CalendarGridColumnHolder
        datetime={firstDateOfColumn}
        colNum={i}
        key={i}
      />
    );
  }
  return (
    <div style={{ position: "absolute", width: "100%", display: "flex" }}>
      <CalendarGridTime />
      <div className="grid">{columns}</div>
    </div>
  );
};

const CalendarGridColumnHolder = (props: {
  colNum: number;
  datetime: number;
}) => {
  return (
    <div className="grid-column-holders">
      <CalendarEventColumn datetime={props.datetime} />
      <CalendarGridColumn colNum={props.colNum} />
    </div>
  );
};

const CalendarGridColumn = (props: { colNum: number }) => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <div
        key={i}
        style={{
          boxShadow:
            i === 23
              ? props.colNum === 4
                ? "none"
                : "inset -1px 0px 0px #e0e0e0"
              : props.colNum === 4
              ? "inset 0px -1px 0px #e0e0e0"
              : "inset -1px -1px 0px #e0e0e0",
        }}
        className="grid-cell"></div>
    );
  }
  return <div className="grid-column">{cells}</div>;
};
