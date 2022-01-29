import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export const CalendarDatePickerReusable = (props: {
  selectedDate: number;
  setCalendarSelectedDate: (newSelectedDate: number) => void;
}) => {
  const { selectedDate, setCalendarSelectedDate } = props;

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
