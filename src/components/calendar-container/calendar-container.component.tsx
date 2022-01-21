import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import { Box } from "@mui/material";
import { CalendarSurface } from "../calendar-grid/calendar-grid.component";
import { CalendarHeader } from "../calendar-header/calendar-header.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";
import { CreateEventFormDialog } from "../create-event-form/create-event-form-dialog";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import "./calendar-container.css";
import { useSetWindowAndView } from "../../hooks/use-set-window";
import { useSelector } from "../../redux/hooks/use-selector";
import addDays from "date-fns/addDays";

export const Calendar = (props: { cellSize: number }) => {
  const setWindowAndView = useSetWindowAndView();
  const { pointer } = useSelector((state) => state.view);
  const { start } = useSelector((state) => state.window);
  console.log({ pointer });

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        width: "100%",
        "& .MuiCalendarPicker-root": {
          minWidth: "300px",
        },
      }}>
      <Box sx={{ backgroundColor: "rgb(25, 118, 210, 0.07)" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={addDays(start, pointer)}
            onChange={(newValue) => {
              if (!newValue) {
                return;
              }
              setWindowAndView(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ width: "100%", minWidth: "550px" }}>
        <div className="calendar">
          <CalendarCommandBar />
          <CalendarContainer cellSize={props.cellSize} />
          <CreateEventFormDialog />
        </div>
      </Box>
    </Box>
  );
};

const CalendarContainer = (props: { cellSize: number }) => {
  return (
    <div className="calendar-container">
      <CalendarHeader />
      <div className="calendar-scrollable-grid">
        <CalendarSurface cellSize={props.cellSize} />
      </div>
    </div>
  );
};
