import { Box } from "@mui/material";
import { CalendarSurfaceScrollableGrid } from "../calendar-surface-grid";
import { CalendarSurfaceHeader } from "../calendar-surface-header";

export const CalendarSurfaceRenderer = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CalendarSurfaceHeader />
      <CalendarSurfaceScrollableGrid />
    </Box>
  );
};
