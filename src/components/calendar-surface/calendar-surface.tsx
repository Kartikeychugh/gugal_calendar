import { Paper } from "@mui/material";
import { CalendarGrid } from "../calendar-grid/calendar-grid.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";
import { CalendarSurfaceSizeWatcher } from "../@core";
import { CreateEventFormDialog } from "../create-event-form/create-event-form-dialog";
import { useContext } from "react";
import { CalendarDimensionsContext } from "../../contexts";

export const CalendarSurface = () => {
  const dimensions = useContext(CalendarDimensionsContext);
  return (
    <CalendarSurfaceSizeWatcher>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: `${dimensions.surfacePadding}px`,
        }}>
        <CalendarCommandBar />
        <CalendarGrid />
        <CreateEventFormDialog />
      </Paper>
    </CalendarSurfaceSizeWatcher>
  );
};
