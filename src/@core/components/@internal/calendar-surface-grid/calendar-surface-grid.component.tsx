import { Box } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { CalendarViewContext } from "../../..";
import { useSizeWatcher } from "../../../hooks";
import { CalendarSurfaceColumns } from "../calendar-surface-column";
import { CalendarSurfaceTimeGrid } from "../calendar-surface-time-grid";
import { CalendarSurfaceTimeMarker } from "../calendar-surface-time-marker";

export const CalendarSurfaceScrollableGrid = (props: {
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
      <CalendarSurfaceGrid onCellClick={props.onCellClick} />
    </Box>
  );
};

const CalendarSurfaceGrid = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarSurfaceTimeGrid />
      <CalendarSurfaceGridRenderer onCellClick={props.onCellClick} />
    </Box>
  );
};

const CalendarSurfaceGridRenderer = (props: {
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const { onCellClick } = props;

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarSurfaceTimeMarker />
      <CalendarSurfaceColumns onCellClick={onCellClick} />
    </Box>
  );
};

const useScrollToTimeMarker = (ref: React.RefObject<HTMLDivElement>) => {
  const { dimensions } = useContext(CalendarViewContext);

  useEffect(() => {
    const now = new Date();
    const time = now.getHours() * 60 + now.getMinutes();

    ref.current &&
      ref.current.scrollTo({
        left: 0,
        top: (dimensions.cellHeight / 60) * time,
        behavior: "smooth",
      });
  }, [dimensions.cellHeight, ref]);
};

const useSurfaceGridHeightWatcher = (ref: React.RefObject<HTMLDivElement>) => {
  const height = useSizeWatcher(ref, "height");
  const { setCellHeight } = useContext(CalendarViewContext);

  useEffect(() => {
    setCellHeight(height / 12);
  }, [height, setCellHeight]);
};
