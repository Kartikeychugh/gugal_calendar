import { Box } from "@mui/material";
import { eachDayOfInterval, isSameDay, startOfToday } from "date-fns";
import { useContext, useRef } from "react";
import { extractEventForDay } from "../../../../utils";
import { useCalendarEventDetails } from "../../../providers/calendar-events-details";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";
import { CalendarSurfaceEventColumnReusable } from "../calendar-surface-event-column/calendar-surface-event-column.reusable";
import { CalendarSurfaceGridColumnReusable } from "../calendar-surface-grid-column/calendar-surface-grid-column.reusable";
import { CalendarSurfaceSizeWatcherReusable } from "../calendar-surface-size-watcher/calendar-surface-size-watcher.component.reusable";

export const CalendarSurfaceColumnsReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { events, colors } = useCalendarEventDetails();
  const {
    dimensions,
    startDateOfView,
    endDateOfView,
    getView,
    updateResponsiveView,
    allViews,
    userViewId,
    setAvailableViews,
  } = useContext(CalendarViewContextReusable);

  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <CalendarSurfaceSizeWatcherReusable
      containerRef={containerRef}
      allViews={allViews}
      getView={getView}
      setAvailableViews={setAvailableViews}
      userViewId={userViewId}
      updateResponsiveView={updateResponsiveView}
    >
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
            colors={colors}
            events={events}
            lastColumn={i + 1 === currentDates.length}
            date={day}
            key={i}
            numberOfDaysInTheView={currentDates.length}
            columnDimensions={{
              minColumnWidth: dimensions.columnWidth,
              minCellHeight: dimensions.cellHeight,
            }}
            onCellClick={props.onCellClick}
          />
        ))}
      </Box>
    </CalendarSurfaceSizeWatcherReusable>
  );
};

const CalendarSurfaceColumn = (props: {
  date: Date;
  events: CalendarEventItem[] | undefined;
  lastColumn: boolean;
  numberOfDaysInTheView: number;
  columnDimensions: {
    minColumnWidth: number;
    minCellHeight: number;
  };
  onCellClick: (datetime: Date, hour: number) => void;
  colors: CalendarColors;
}) => {
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
        minWidth: `${props.columnDimensions.minColumnWidth}px`,
      }}
    >
      <CalendarSurfaceEventColumnReusable
        colors={props.colors}
        events={extractEventForDay(props.events, props.date)}
        numberOfDaysInTheView={props.numberOfDaysInTheView}
        minCellHeight={props.columnDimensions.minCellHeight}
      />
      <CalendarSurfaceGridColumnReusable
        date={props.date}
        isLastColumnInView={props.lastColumn}
        minCellHeight={props.columnDimensions.minCellHeight}
        onCellClick={props.onCellClick}
      />
    </Box>
  );
};
