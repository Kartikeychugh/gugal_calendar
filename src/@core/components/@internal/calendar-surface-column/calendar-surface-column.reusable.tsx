import { Box } from "@mui/material";
import { eachDayOfInterval } from "date-fns";
import { useRef } from "react";
import { ICalendarEventItem } from "../../../../models";
import { extractEventForDay } from "../../../../utils";
import { ICalendarView } from "../../../providers/calendar-view/calendar-view.context";
import { CalendarSurfaceEventColumnReusable } from "../calendar-surface-event-column/calendar-surface-event-column.reusable";
import { CalendarSurfaceGridColumnReusable } from "../calendar-surface-grid-column/calendar-surface-grid-column.reusable";
import { CalendarSurfaceSizeWatcherReusable } from "../calendar-surface-size-watcher/calendar-surface-size-watcher.component.reusable";

export const CalendarSurfaceColumnsReusable = (props: {
  events: ICalendarEventItem[];
  startDateOfView: number;
  endDateOfView: number;
  onCellClick: (datetime: Date, hour: number) => void;
  columnDimensions: {
    minColumnWidth: number;
    minCellHeight: number;
  };
  colors: CalendarColors | null;
  allViews: ICalendarView[];
  getView: (viewId: number) => ICalendarView;
  setAvailableViews: (newAvailableViews: ICalendarView[]) => void;
  userViewId: number;
  updateResponsiveView: (newViewId: number | null) => void;
}) => {
  const {
    allViews,
    getView,
    setAvailableViews,
    userViewId,
    updateResponsiveView,
  } = props;
  const currentDates = eachDayOfInterval({
    start: props.startDateOfView,
    end: props.endDateOfView,
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
            colors={props.colors}
            events={props.events}
            lastColumn={i + 1 === currentDates.length}
            date={day}
            key={i}
            numberOfDaysInTheView={currentDates.length}
            columnDimensions={{
              minColumnWidth: props.columnDimensions.minColumnWidth,
              minCellHeight: props.columnDimensions.minCellHeight,
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
  colors: CalendarColors | null;
}) => {
  return (
    <Box
      sx={{
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
