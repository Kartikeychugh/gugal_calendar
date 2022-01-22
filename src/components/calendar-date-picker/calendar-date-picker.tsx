import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import { useUpdateSelectedDate } from "../../hooks/use-set-window";
import { useView } from "../../hooks/use-view";

export const CalendarDatePicker = () => {
  const { selectedDate } = useView();
  const setWindowAndView = useUpdateSelectedDate();

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
            setWindowAndView(newValue);
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};
