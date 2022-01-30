import { Box } from "@mui/material";

import { CalendarSurfaceContainer } from "../calendar-surface-container";
import { CalendarDatePickerContainer } from "../calendar-date-picker-container";
import { CalendarCommandBar } from "../../@core";

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
        <CalendarDatePickerContainer />
        <CalendarSurfaceContainer />
      </Box>
    </Box>
  );
};
