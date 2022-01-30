import { Box } from "@mui/material";
import { eachDayOfInterval, isSameDay, startOfToday } from "date-fns";
import { useContext, useRef } from "react";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";
import { CalendarSurfaceEventColumnReusable } from "../calendar-surface-event-column/calendar-surface-event-column.reusable";
import { CalendarSurfaceGridColumnReusable } from "../calendar-surface-grid-column/calendar-surface-grid-column.reusable";
import { CalendarSurfaceSizeWatcherReusable } from "../calendar-surface-size-watcher/calendar-surface-size-watcher.component.reusable";

export const CalendarSurfaceColumnsReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { startDateOfView, endDateOfView } = useContext(
    CalendarViewContextReusable
  );

  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <CalendarSurfaceSizeWatcherReusable containerRef={containerRef}>
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
    </CalendarSurfaceSizeWatcherReusable>
  );
};

const CalendarSurfaceColumn = (props: {
  date: Date;
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const {
    dimensions: { columnWidth },
  } = useContext(CalendarViewContextReusable);

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
      <CalendarSurfaceEventColumnReusable date={props.date} />
      <CalendarSurfaceGridColumnReusable
        date={props.date}
        onCellClick={props.onCellClick}
      />
    </Box>
  );
};
