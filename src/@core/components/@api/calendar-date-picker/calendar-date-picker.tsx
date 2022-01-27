import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useCalendarView } from "../../../hooks";

export const CalendarDatePicker = () => {
  const { selectedDate, setCalendarSelectedDate } = useCalendarView();

  return (
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
  );
};
