import { Box } from "@mui/material";
import { eachDayOfInterval, isSameDay, startOfToday } from "date-fns";
import { useContext, useRef } from "react";
import { CalendarViewContext } from "../../..";
import { CalendarSurfaceEventColumn } from "../calendar-surface-event-column";
import { CalendarSurfaceGridColumn } from "../calendar-surface-grid-column";
import { CalendarSurfaceSizeWatcher } from "../calendar-surface-size-watcher";

export const CalendarSurfaceColumns = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { startDateOfView, endDateOfView } = useContext(CalendarViewContext);

  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <CalendarSurfaceSizeWatcher containerRef={containerRef}>
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        {currentDates.map((day, i) => (
          <CalendarSurfaceColumn
            key={i}
            date={day}
            onCellClick={props.onCellClick}
          />
        ))}
      </Box>
    </CalendarSurfaceSizeWatcher>
  );
};

const CalendarSurfaceColumn = (props: {
  date: Date;
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const {
    dimensions: { columnWidth },
  } = useContext(CalendarViewContext);

  return (
    <Box
      sx={{
        backgroundColor: `${
          isSameDay(props.date, startOfToday())
            ? "rgb(25, 118, 210, 0.07)"
            : "#ffffff"
        }`,
        height: "100%",
        width: "100%",
        minWidth: `${columnWidth}px`,
      }}
    >
      <CalendarSurfaceEventColumn date={props.date} />
      <CalendarSurfaceGridColumn
        date={props.date}
        onCellClick={props.onCellClick}
      />
    </Box>
  );
};
