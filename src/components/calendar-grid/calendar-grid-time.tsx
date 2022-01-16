export const CalendarGridTime = (props: { cellSize: number }) => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <CalendarGridTimeCell cellSize={props.cellSize} key={i} hour={i} />
    );
  }
  return <div className="grid-time-container">{cells}</div>;
};

const CalendarGridTimeCell = (props: { hour: number; cellSize: number }) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  return (
    <div style={{ height: `${props.cellSize}px` }} className="grid-time-cell">
      <div className="grid-time-cell-first-line">
        {hour} {ampm}
      </div>
    </div>
  );
};
