import { Box, useTheme } from "@mui/material";
import { getDay, startOfToday } from "date-fns";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useCurrentTime } from "../../../hooks";
import {
  CalendarViewContext,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";

export const CalendarSurfaceTimeMarker = (props: {}) => {
  const {
    startDateOfView,
    currentView: { numberOfDays },
  } = useContext(CalendarViewContext);
  const { cellHeight } = useCalendarDimensionCellHeightContext();

  const diff = startOfToday().getDay() - getDay(startDateOfView);
  const time = useCurrentTime();
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useLayoutEffect(() => {
    ref.current &&
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
  }, []);

  let totalMarkerLengthFraction;
  let solidMarrkerLengthFraction;
  let _diff = diff < 0 ? 6 : diff;

  if (_diff < 0) {
    _diff = _diff + numberOfDays;
    totalMarkerLengthFraction = (_diff + 1) / numberOfDays;
    solidMarrkerLengthFraction = _diff / (_diff + 1);
  } else if (_diff >= numberOfDays) {
    totalMarkerLengthFraction = 1;
    solidMarrkerLengthFraction = 1;
  } else {
    totalMarkerLengthFraction = (_diff + 1) / numberOfDays;
    solidMarrkerLengthFraction = _diff / (_diff + 1);
  }

  let solidWidth = solidMarrkerLengthFraction * 100;
  let dottedWiddth = 100 - solidWidth;

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        zIndex: 1,
        top: `${(cellHeight / 60) * time}px`,
        width: `calc(${100 * totalMarkerLengthFraction}%)`,
      }}
      ref={ref}
    >
      <Box
        sx={{
          borderTop: "2px dotted",
          width: `${solidWidth}%`,
          borderColor: `${theme.palette.timeIndicator}`,
        }}
      ></Box>
      {dottedWiddth ? (
        <>
          <Box
            sx={{
              borderRadius: "5px",
              width: "10px",
              height: "10px",
              top: "-4px",
              background: `${theme.palette.timeIndicator}`,
              position: "relative",
            }}
          ></Box>
          <Box
            sx={{
              borderTop: "2px solid",
              width: `calc(${dottedWiddth}% - 20px)`,
              borderColor: `${theme.palette.timeIndicator}`,
            }}
          ></Box>
          <Box
            sx={{
              borderRadius: "5px",
              width: "10px",
              height: "10px",
              top: "-4px",
              background: `${theme.palette.timeIndicator}`,
              position: "relative",
            }}
          ></Box>
        </>
      ) : null}
    </Box>
  );
};
