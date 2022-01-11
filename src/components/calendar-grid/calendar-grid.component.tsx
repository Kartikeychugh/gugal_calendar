import { CalendarGridTime } from "./calendar-grid-time";
import "./calendar-grid.css";

export const CalendarGrid = () => {
  const rows = [];

  for (let i = 0; i < 5; i++) {
    rows.push(<CalendarColumn key={i} />);
  }
  return (
    <div className="grid">
      <CalendarGridTime />
      {rows}
    </div>
  );
};

const CalendarColumn = () => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(<div key={i} className="grid-cell"></div>);
  }
  return <div className="grid-column">{cells}</div>;
};
