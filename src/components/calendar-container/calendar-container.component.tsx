import { Box } from "@mui/material";
import { CalendarDimensionsProvider } from "../../contexts";
import { CalendarReduxProvider } from "../../redux/provider/provider";

import { CalendarDatePicker } from "../calendar-date-picker";
import { CalendarSurface } from "../calendar-surface";

export const Calendar = (props: {
  cellSize: number;
  timeGridWidth: number;
}) => {
  return (
    <CalendarReduxProvider>
      <CalendarDimensionsProvider
        value={{
          cellSize: props.cellSize,
          timeGridWidth: props.timeGridWidth,
        }}>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            width: "100%",
          }}>
          <CalendarDatePicker />
          <CalendarSurface />
        </Box>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
