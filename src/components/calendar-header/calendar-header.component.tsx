import "./calendar-header.css";

export const CalendarHeader = () => {
  const cells = [];

  for (let i = 0; i < 5; i++) {
    cells.push(<div className="header-cell">{numToDay[i + 1]}</div>);
  }

  return (
    <div className="header-container">
      <div className="header-gutter"> </div>
      {cells}
    </div>
  );
};

const numToDay: { [key: number]: string } = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
};
