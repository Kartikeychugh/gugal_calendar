import "./calendar-header.css";

export const CalendarHeader = () => {
  const cells = [];
  const today = new Date();
  const l = today.getDate() - today.getDay() + 1;
  for (let i = 0; i < 5; i++) {
    cells.push(
      <div
        key={i}
        style={{
          boxShadow:
            i === 4
              ? "inset 0px -1px 0px #e0e0e0"
              : "inset -1px -1px 0px #e0e0e0",
        }}
        className="header-cell">
        <div className="header-cell-first-line">{numToDay[i + 1]}</div>
        <div className="header-cell-second-line">{l + i}</div>
      </div>
    );
  }

  return (
    <div className="header-container">
      <div className="header-gutter"></div>
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
