export const CalendarGridTime = () => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(<CalendarGridTimeCell key={i} hour={i} />);
  }
  return <div className="grid-time-container">{cells}</div>;
};

const CalendarGridTimeCell = (props: { hour: number }) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  return (
    <div className="grid-time-cell">
      <div className="grid-time-cell-first-line">
        {hour} {ampm}
      </div>
    </div>
  );
};
