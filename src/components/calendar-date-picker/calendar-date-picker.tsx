import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import { addDays } from "date-fns";
import { useSetWindowAndView } from "../../hooks/use-set-window";
import { useSelector } from "../../redux/hooks/use-selector";

export const CalendarDatePicker = () => {
  const { start } = useSelector((state) => state.window);
  const { pointer } = useSelector((state) => state.view);
  const setWindowAndView = useSetWindowAndView();

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
          date={addDays(start, pointer)}
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
