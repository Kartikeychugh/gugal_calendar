import { Box, useTheme } from "@mui/material";
import { isSameDay, startOfToday } from "date-fns";
import { useRef } from "react";
import { ICalendarEventItem, useCalendarViewManager } from "../../..";
import { CalendarSurfaceEventColumn } from "../calendar-surface-event-column";
import { CalendarSurfaceGridColumn } from "../calendar-surface-grid-column";
import { CalendarSurfaceSizeWatcher } from "../calendar-surface-size-watcher";

export const CalendarSurfaceColumns = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
  RenderEventCard: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const { viewDates } = useCalendarViewManager();

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
        {viewDates.map((day, i) => (
          <CalendarSurfaceColumn
            key={i}
            date={day}
            onCellClick={props.onCellClick}
            RenderEventCard={props.RenderEventCard}
          />
        ))}
      </Box>
    </CalendarSurfaceSizeWatcher>
  );
};

const CalendarSurfaceColumn = (props: {
  date: Date;
  onCellClick: (datetime: Date, hour: number) => void;
  RenderEventCard: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const theme = useTheme();

  //TODO
  return (
    <Box
      sx={{
        backgroundImage: `${
          isSameDay(props.date, startOfToday())
            ? theme.palette.backgroundImage?.main
            : "inherit"
        }`,
        height: "100%",
        width: "100%",
      }}
    >
      <CalendarSurfaceEventColumn
        date={props.date}
        RenderEventCard={props.RenderEventCard}
      />
      <CalendarSurfaceGridColumn
        date={props.date}
        onCellClick={props.onCellClick}
      />
    </Box>
  );
};
