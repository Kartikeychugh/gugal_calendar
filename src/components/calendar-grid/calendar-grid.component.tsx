import {
  CalendarEventColumn,
  CalendarEventGrid,
} from "../calendar-event-grid/calendar-event-grid.component";
import { CalendarGridTime } from "./calendar-grid-time";
import "./calendar-grid.css";

export const CalendarGrid = () => {
  const columns = [];

  for (let i = 0; i < 5; i++) {
    columns.push(<CalendarGridColumnHolder key={i} />);
  }
  return (
    <div style={{ position: "absolute", width: "100%", display: "flex" }}>
      <CalendarGridTime />
      <div className="grid">{columns}</div>
    </div>
  );
};

const CalendarGridColumnHolder = () => {
  // const gridColumn = [];
  // for (let i = 0; i < 24; i++) {
  //   gridColumn.push(<CalendarGridColumn key={i} />);
  // }
  return (
    <div className="grid-column-holders">
      <CalendarEventColumn />
      <CalendarGridColumn />
    </div>
  );
};

const CalendarGridColumn = () => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(<div key={i} className="grid-cell"></div>);
  }
  return <div className="grid-column">{cells}</div>;
};
