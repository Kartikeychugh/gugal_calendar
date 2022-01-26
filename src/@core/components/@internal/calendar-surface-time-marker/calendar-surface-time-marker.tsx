import { Box } from "@mui/material";
import { useRef, useEffect, useContext } from "react";
import { CalendarDimensionsContext } from "../../../providers";
import { useCurrentTime } from "../../../../hooks";

export const CalendarSurfaceTimeMarker = (props: {
  view: number;
  diff: number;
}) => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  const time = useCurrentTime();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current &&
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, []);

  let totalMarkerLengthFraction;
  let solidMarrkerLengthFraction;
  let _diff = props.diff < 0 ? 6 : props.diff;

  if (_diff < 0) {
    _diff = _diff + props.view;
    totalMarkerLengthFraction = (_diff + 1) / props.view;
    solidMarrkerLengthFraction = _diff / (_diff + 1);
  } else if (_diff >= props.view) {
    totalMarkerLengthFraction = 1;
    solidMarrkerLengthFraction = 1;
  } else {
    totalMarkerLengthFraction = (_diff + 1) / props.view;
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
        top: `${(calendarDimensionsValue.minCellHeight / 60) * time}px`,
        width: `calc(${100 * totalMarkerLengthFraction}%)`,
      }}
      ref={ref}
    >
      <Box sx={{ borderTop: "2px red dotted", width: `${solidWidth}%` }}></Box>
      <Box sx={{ borderTop: "2px red solid", width: `${dottedWiddth}%` }}></Box>
    </Box>
  );
};
