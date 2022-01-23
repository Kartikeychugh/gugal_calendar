import { Paper } from "@mui/material";
import { CalendarGrid } from "../calendar-grid/calendar-grid.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";
import { CalendarSurfaceSizeWatcher } from "../@core";
import { CreateEventFormDialog } from "../create-event-form/create-event-form-dialog";

export const CalendarSurface = () => {
  return (
    <CalendarSurfaceSizeWatcher>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // minWidth: "400px",
          // ml: 1,
          padding: "16px 16px 16px 16px",
        }}>
        <CalendarCommandBar />
        <CalendarGrid />
        <CreateEventFormDialog />
      </Paper>
    </CalendarSurfaceSizeWatcher>
  );
};
