export const CalendarGridTime = () => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(<CalendarGridTimeCell />);
  }
  return <div className="grid-time-container">{cells}</div>;
};

const CalendarGridTimeCell = () => {
  return <div className="grid-time-cell">00: 00 AM</div>;
};
