import { Box, useTheme } from "@mui/material";
import { isSameDay, startOfToday } from "date-fns";
import React from "react";
import { useRef } from "react";
import { ICalendarEventItem, useCalendarViewManager } from "../../..";
import { CalendarSurfaceEventColumn } from "../calendar-surface-event-column";
import { CalendarSurfaceGridColumn } from "../calendar-surface-grid-column";
import { CalendarSurfaceSizeWatcher } from "../calendar-surface-size-watcher";

export const CalendarSurfaceColumns = React.memo(
  (props: {
    onCellClick: (start: Date, end: Date) => void;
    CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
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
              CientEventCard={props.CientEventCard}
            />
          ))}
        </Box>
      </CalendarSurfaceSizeWatcher>
    );
  }
);

const CalendarSurfaceColumn = React.memo(
  (props: {
    date: Date;
    onCellClick: (start: Date, end: Date) => void;
    CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
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
          position: "relative",
        }}
      >
        <CalendarSurfaceEventColumn
          date={props.date}
          CientEventCard={props.CientEventCard}
        />
        <CalendarSurfaceGridColumn
          date={props.date}
          onCellClick={props.onCellClick}
        />
      </Box>
    );
  }
);
