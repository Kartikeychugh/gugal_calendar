import { Box } from "@mui/material";
import { eachDayOfInterval, startOfToday } from "date-fns";
import { useRef } from "react";
import { ICalendarDimensionsContext } from "../../../providers";
import { ICalendarEventItem } from "../../../../models";
import { useSizeWatcher } from "../../../hooks";
import { CalendarSurfaceColumnsReusable } from "../calendar-surface-column/calendar-surface-column.reusable";
import { CalendarSurfaceTimeMarkerReusable } from "../calendar-surface-time-marker/calendar-surface-time-marker.reusable";
import { CalendarSurfaceTimeGridReusable } from "../calendar-surface-time-grid/calendar-surface-time-grid.reusable";
import { ICalendarView } from "../../../providers/calendar-view/calendar-view.context";

export const CalendarSurfaceScrollableGridReusable = (props: {
  events: ICalendarEventItem[];
  startDateOfView: number;
  endDateOfView: number;
  onCellClick: (datetime: Date, hour: number) => void;
  dimensions: ICalendarDimensionsContext;
  colors: CalendarColors | null;
  allViews: ICalendarView[];
  getView: (viewId: number) => ICalendarView;
  setAvailableViews: (newAvailableViews: ICalendarView[]) => void;
  userViewId: number;
  updateResponsiveView: (newViewId: number | null) => void;
}) => {
  const ref = useRef(null);
  const width = useSizeWatcher(ref, "height");

  return (
    <Box
      ref={ref}
      sx={
        {
          overflowY: "overlay",
          width: "100%",
        } as any
      }
    >
      <CalendarSurfaceGridReusable
        {...props}
        dimensions={{
          ...props.dimensions,
          minCellHeight:
            width === 0
              ? props.dimensions.minCellHeight
              : Math.max(width / 12, props.dimensions.minCellHeight),
        }}
      />
    </Box>
  );
};

const CalendarSurfaceGridReusable = (props: {
  events: ICalendarEventItem[];
  startDateOfView: number;
  endDateOfView: number;
  onCellClick: (datetime: Date, hour: number) => void;
  dimensions: ICalendarDimensionsContext;
  colors: CalendarColors | null;
  allViews: ICalendarView[];
  getView: (viewId: number) => ICalendarView;
  setAvailableViews: (newAvailableViews: ICalendarView[]) => void;
  userViewId: number;
  updateResponsiveView: (newViewId: number | null) => void;
}) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarSurfaceTimeGridReusable dimensions={props.dimensions} />
      <CalendarSurfaceGridRendererReusable {...props} />
    </Box>
  );
};

const CalendarSurfaceGridRendererReusable = (props: {
  events: ICalendarEventItem[];
  startDateOfView: number;
  endDateOfView: number;
  onCellClick: (datetime: Date, hour: number) => void;
  dimensions: ICalendarDimensionsContext;
  colors: CalendarColors | null;
  allViews: ICalendarView[];
  getView: (viewId: number) => ICalendarView;
  setAvailableViews: (newAvailableViews: ICalendarView[]) => void;
  userViewId: number;
  updateResponsiveView: (newViewId: number | null) => void;
}) => {
  const {
    events,
    startDateOfView,
    endDateOfView,
    onCellClick,
    dimensions,
    colors,
    ...otherProps
  } = props;

  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarSurfaceTimeMarkerReusable
        view={currentDates.length}
        diff={startOfToday().getDay() - currentDates[0].getDay()}
        minCellHeight={dimensions.minCellHeight}
      />
      <CalendarSurfaceColumnsReusable
        colors={colors}
        startDateOfView={startDateOfView}
        endDateOfView={endDateOfView}
        events={events}
        onCellClick={onCellClick}
        columnDimensions={{
          minCellHeight: dimensions.minCellHeight,
          minColumnWidth: dimensions.minColumnWidth,
        }}
        {...otherProps}
      />
    </Box>
  );
};
