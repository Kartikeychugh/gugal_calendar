import { Box } from "@mui/material";
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

  useScrollToTimeMarker(ref);
  useSurfaceGridHeightWatcher(ref);

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
      <CalendarSurfaceGridReusable onCellClick={props.onCellClick} />
    </Box>
  );
};

const CalendarSurfaceGridReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarSurfaceTimeGridReusable />
      <CalendarSurfaceGridRendererReusable onCellClick={props.onCellClick} />
    </Box>
  );
};

const CalendarSurfaceGridRendererReusable = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { onCellClick } = props;

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarSurfaceTimeMarkerReusable />
      <CalendarSurfaceColumnsReusable onCellClick={onCellClick} />
    </Box>
  );
};

const useScrollToTimeMarker = (ref: React.RefObject<HTMLDivElement>) => {
  const time = useCurrentTime();
  const { dimensions } = useContext(CalendarViewContextReusable);

  useEffect(() => {
    ref.current &&
      ref.current.scrollTo({
        left: 0,
        top: (dimensions.cellHeight / 60) * time,
        behavior: "smooth",
      });
  }, [dimensions.cellHeight, ref.current]);
};

const useSurfaceGridHeightWatcher = (ref: React.RefObject<HTMLDivElement>) => {
  const height = useSizeWatcher(ref, "height");
  const { setCellHeight } = useContext(CalendarViewContextReusable);

  useEffect(() => {
    setCellHeight(height / 12);
  }, [height, setCellHeight]);
};
