import { Box } from "@mui/material";
import { useCalendarDimensionCellHeightContext } from "../../../providers";

export const CalendarSurfaceTimeGrid = (props: {}) => {
  const { cellHeight } = useCalendarDimensionCellHeightContext();

  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <CalendarGridTimeCell key={i} hour={i} cellHeight={cellHeight} />
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: `50px`,
      }}
    >
      {cells}
    </Box>
  );
};

const CalendarGridTimeCell = (props: { hour: number; cellHeight: number }) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: `${props.cellHeight}px`,
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
