import { Box } from "@mui/material";

import { CalendarSurfaceContainer } from "../calendar-surface-container";
import { CalendarDatePickerContainer } from "../calendar-date-picker-container";
import { CalendarCommandBarContainer } from "../calendar-command-bar-container";

export const CalendarContainer = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <CalendarCommandBarContainer />
      <Box sx={{ display: "flex", height: "calc(100% - 60px)" }}>
        <CalendarDatePickerContainer />
        <CalendarSurfaceContainer />
      </Box>
    </Box>
  );
};
