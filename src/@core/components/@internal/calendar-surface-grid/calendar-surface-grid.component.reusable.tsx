import { Box } from "@mui/material";
import { eachDayOfInterval, startOfToday } from "date-fns";
import { useContext, useEffect, useRef } from "react";
import { useCurrentTime, useSizeWatcher } from "../../../hooks";
import { CalendarSurfaceColumnsReusable } from "../calendar-surface-column/calendar-surface-column.reusable";
import { CalendarSurfaceTimeMarkerReusable } from "../calendar-surface-time-marker/calendar-surface-time-marker.reusable";
import { CalendarSurfaceTimeGridReusable } from "../calendar-surface-time-grid/calendar-surface-time-grid.reusable";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";

export const CalendarSurfaceScrollableGridReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const height = useSizeWatcher(ref, "height");
  const { dimensions, setCellHeight } = useContext(CalendarViewContextReusable);
  const time = useCurrentTime();

  useEffect(() => {
    ref.current &&
      ref.current.scrollTo({
        left: 0,
        top: (dimensions.cellHeight / 60) * time,
        behavior: "smooth",
      });
  }, [dimensions.cellHeight, time]);

  useEffect(() => {
    setCellHeight(height / 12);
  }, [height, setCellHeight]);

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
      <CalendarSurfaceGridReusable {...props} />
    </Box>
  );
};

const CalendarSurfaceGridReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { dimensions } = useContext(CalendarViewContextReusable);
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarSurfaceTimeGridReusable dimensions={dimensions} />
      <CalendarSurfaceGridRendererReusable {...props} />
    </Box>
  );
};

const CalendarSurfaceGridRendererReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { onCellClick } = props;

  const { startDateOfView, endDateOfView, dimensions } = useContext(
    CalendarViewContextReusable
  );

  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarSurfaceTimeMarkerReusable
        view={currentDates.length}
        diff={startOfToday().getDay() - currentDates[0].getDay()}
        minCellHeight={dimensions.cellHeight}
      />
      <CalendarSurfaceColumnsReusable onCellClick={onCellClick} />
    </Box>
  );
};
