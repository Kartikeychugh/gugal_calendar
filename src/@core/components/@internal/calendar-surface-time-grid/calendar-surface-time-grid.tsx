import { Box } from "@mui/material";
import { useContext } from "react";
import { CalendarViewContext } from "../../../providers";

export const CalendarSurfaceTimeGrid = (props: {}) => {
  const { dimensions } = useContext(CalendarViewContext);

  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <CalendarGridTimeCell key={i} hour={i} dimensions={dimensions} />
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: `${dimensions.timeGridWidth}px`,
      }}
    >
      {cells}
    </Box>
  );
};

const CalendarGridTimeCell = (props: {
  hour: number;
  dimensions: {
    cellHeight: number;
    timeGridWidth: number;
    columnWidth: number;
  };
}) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: `${props.dimensions.cellHeight}px`,
        padding: "4px",
      }}
    >
      <Box
        sx={{
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#71717a",
        }}
      >
        {hour} {ampm}
      </Box>
    </Box>
  );
};
