import React from "react";
import { CalendarGridCell } from "./calendar-grid-cell";

export const CalendarGridCellsRenderer = React.memo(
  (props: { cellHeight: number; date: Date }) => {
    const { cellHeight, date } = props;
    const hours = [];

    for (let hour = 0; hour < 24; hour++) {
      hours.push(hour);
    }

    return (
      <>
        {hours.map((hour) => (
          <CalendarGridCell
            key={hour}
            cellHeight={cellHeight}
            i={hour}
            date={date}
          />
        ))}
      </>
    );
  }
);
