import { Box } from "@mui/material";

import { CalendarDatePicker } from "../calendar-date-picker";
import { CalendarSurface } from "../calendar-surface";

export const Calendar = (props: {
  cellSize: number;
  timeGridWidth: number;
}) => {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        width: "100%",
      }}>
      <CalendarDatePicker />
      <CalendarSurface
        timeGridWidth={props.timeGridWidth}
        cellSize={props.cellSize}
      />
    </Box>
  );
};
