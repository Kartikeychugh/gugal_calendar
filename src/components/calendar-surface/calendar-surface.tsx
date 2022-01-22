import { Paper } from "@mui/material";
import { CalendarGrid } from "../calendar-grid/calendar-grid.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";
import { CreateEventFormDialog } from "../create-event-form/create-event-form-dialog";

export const CalendarSurface = (props: {
  cellSize: number;
  timeGridWidth: number;
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // minWidth: "400px",
        ml: 1,
        padding: "16px 16px 16px 16px",
      }}>
      <CalendarCommandBar timeGridWidth={props.timeGridWidth} />
      <CalendarGrid
        cellSize={props.cellSize}
        timeGridWidth={props.timeGridWidth}
      />
      <CreateEventFormDialog />
    </Paper>
  );
};
