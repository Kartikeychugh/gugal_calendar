import { Box } from "@mui/material";
import { CalendarDimensionsProvider } from "../../contexts";
import { CalendarViewProvider } from "../../contexts/calendar-view/calendar-view.context";
import { CalendarReduxProvider } from "../../redux/provider/provider";

import { CalendarDatePicker } from "../calendar-date-picker";
import { CalendarSurface } from "../calendar-surface";

export const Calendar = (props: {
  columnMinWidth: number;
  cellHeight: number;
}) => {
  return (
    <CalendarReduxProvider>
      <CalendarDimensionsProvider
        value={{
          cellHeight: props.cellHeight,
          timeGridWidth: 50,
          columnMinWidth: props.columnMinWidth,
          surfacePadding: 16,
        }}>
        <CalendarViewProvider>
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              width: "100%",
            }}>
            <CalendarDatePicker />
            <CalendarSurface />
          </Box>
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
