import { Box, Paper } from "@mui/material";
import { useContext } from "react";
import {
  CalendarDimensionsContext,
  CalendarDimensionsProvider,
} from "../../contexts";
import { CalendarViewProvider } from "../../contexts/calendar-view/calendar-view.context";
import { CalendarReduxProvider } from "../../redux/provider/provider";

import { CalendarDatePicker } from "../@core/calendar-date-picker";
import { CalendarSurface } from "../@core/calendar-surface";
import { CalendarCommandBar } from "../@core/calender-command-bar/calendar-command-bar.component";

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
        }}
      >
        <CalendarViewProvider>
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "60px",
                alignItems: "center",
              }}
            >
              <CalendarCommandBar />
            </Box>
            <Box sx={{ display: "flex", height: "calc(100% - 60px)" }}>
              <Paper
                elevation={2}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "rgb(25, 118, 210, 0.07)",
                  "& .MuiCalendarPicker-root": {
                    minWidth: "300px",
                  },
                }}
              >
                <CalendarDatePicker />
              </Paper>
              <Paper
                elevation={5}
                sx={{
                  borderRadius: "10px 10px 10px 10px",
                  width: "100%",
                  padding: `${16}px`,
                }}
              >
                <CalendarSurface />
              </Paper>
            </Box>
          </Box>
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
