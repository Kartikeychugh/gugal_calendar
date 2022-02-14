import { Box, useTheme } from "@mui/material";
import {
  isWithinInterval,
  startOfToday,
  differenceInCalendarDays,
} from "date-fns";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useCurrentTime } from "../../../hooks";
import {
  useCalendarDimensionCellHeightContext,
  useCalendarViewManager,
} from "../../../providers";

export const CalendarSurfaceTimeMarker = (props: {}) => {
  const {
    currentView: { numberOfDays },
    viewDates,
  } = useCalendarViewManager();
  const ref = useRef<HTMLDivElement>(null);
  const time = useCurrentTime();
  const theme = useTheme();
  const { cellHeight } = useCalendarDimensionCellHeightContext();

  const isTodayWithinView = isWithinInterval(startOfToday(), {
    start: viewDates[0],
    end: viewDates[viewDates.length - 1],
  });
  const numberOfColumnsOnLeft = useMemo(
    () => differenceInCalendarDays(startOfToday(), viewDates[0]),
    [viewDates]
  );

  console.log({ numberOfColumnsOnLeft });

  useLayoutEffect(() => {
    ref.current &&
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
  }, []);

  const timeMarkerHeight = cellHeight / 60;

  return isTodayWithinView ? (
    <Box
      ref={ref}
      sx={{
        position: "absolute",
        display: "flex",
        zIndex: 1,
        left: `calc(${(numberOfColumnsOnLeft * 100) / numberOfDays}%)`,
        top: `${
          timeMarkerHeight *
          (time.getHours() * 60 + time.getMinutes() + time.getSeconds() / 60)
        }px`,
        width: `calc(${100 / numberOfDays}%)`,
      }}
    >
      <Box
        sx={{
          borderRadius: `${timeMarkerHeight * 4}px`,
          width: `${timeMarkerHeight * 8}px`,
          height: `${timeMarkerHeight * 8}px`,
          top: `-${timeMarkerHeight * 3}px`,
          background: `${theme.palette.timeIndicator}`,
          position: "relative",
        }}
      />
      <Box
        sx={{
          background: `${theme.palette.timeIndicator}`,
          height: `${cellHeight / 60}px`,
          width: `calc(100%)`,
        }}
      />
    </Box>
  ) : null;
};
