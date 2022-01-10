import "./calendar-grid.css";

export const CalendarGrid = () => {
  const rows = [];

  for (let i = 0; i < 7; i++) {
    rows.push(<CalendarColumn key={i} />);
  }
  return <div className="grid"> {rows}</div>;
};

const CalendarColumn = () => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(<div key={i} className="grid-cell"></div>);
  }
  return <div className="grid-column">{cells}</div>;
};

// const calculateCoordinate = (event: CalendarEventItem) => {
//   const today = new Date();
//   const l = today.getDate() - today.getDay();

//   const eventDate = new Date(event.start.dateTime);
//   const x = eventDate.getDay();
//   const y = eventDate.getHours();

//   return { x: x, y: y };
// };
