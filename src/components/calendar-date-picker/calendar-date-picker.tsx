import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { CalendarViewContext } from "../../contexts/calendar-view/calendar-view.context";

export const CalendarDatePicker = () => {
  const { selectedDate, setCalendarSelectedDate } =
    useContext(CalendarViewContext);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "10px",
        backgroundColor: "rgb(25, 118, 210, 0.07)",
        "& .MuiCalendarPicker-root": {
          minWidth: "300px",
        },
      }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={new Date(selectedDate)}
          onChange={(newValue) => {
            if (!newValue) {
              return;
            }
            setCalendarSelectedDate(newValue.valueOf());
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};
