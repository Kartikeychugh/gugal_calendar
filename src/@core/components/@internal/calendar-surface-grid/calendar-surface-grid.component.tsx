import { Box, Fade } from "@mui/material";
import { useEffect, useRef } from "react";
import {
  ICalendarEventItem,
  useCalendarDimensionCellHeightContext,
  useCalendarFeatureFlags,
} from "../../..";
import { useSizeWatcher } from "../../../hooks";
import { CalendarSurfaceColumns } from "../calendar-surface-column";
import { CalendarSurfaceTimeGrid } from "../calendar-surface-time-grid";
import { CalendarSurfaceTimeMarker } from "../calendar-surface-time-marker";
import { CustomScrollbar } from "../custom-scrollbar/custom-scrollbar";

export const CalendarSurfaceScrollableGrid = (props: {
  onCellClick: (start: Date, end: Date) => void;
  CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useSurfaceGridHeightWatcher(ref);
  const { cellHeight } = useCalendarDimensionCellHeightContext();

  return (
    <CustomScrollbar>
      <Box
        ref={ref}
        sx={
          {
            overflowY: "overlay",
            width: "100%",
            height: "100%",
          } as any
        }
      >
        {cellHeight ? (
          <Fade in={!!cellHeight} timeout={500}>
            <Box>
              <CalendarSurfaceGrid
                onCellClick={props.onCellClick}
                CientEventCard={props.CientEventCard}
              />
            </Box>
          </Fade>
        ) : null}
      </Box>
    </CustomScrollbar>
  );
};

const CalendarSurfaceGrid = (props: {
  onCellClick: (start: Date, end: Date) => void;
  CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarSurfaceTimeGrid />
      <CalendarSurfaceGridRenderer
        onCellClick={props.onCellClick}
        CientEventCard={props.CientEventCard}
      />
    </Box>
  );
};

const CalendarSurfaceGridRenderer = (props: {
  onCellClick: (start: Date, end: Date) => void;
  CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const { onCellClick, CientEventCard } = props;

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarSurfaceTimeMarker />
      <CalendarSurfaceColumns
        onCellClick={onCellClick}
        CientEventCard={CientEventCard}
      />
    </Box>
  );
};

const useSurfaceGridHeightWatcher = (ref: React.RefObject<HTMLDivElement>) => {
  const { responsiveCellHeight } = useCalendarFeatureFlags();

  const height = useSizeWatcher(ref, !!responsiveCellHeight, "height");
  const { setCellHeight } = useCalendarDimensionCellHeightContext();

  useEffect(() => {
    if (!height) {
      return;
    }
    setCellHeight(height / 12);
  }, [height, setCellHeight]);

  return height;
};
