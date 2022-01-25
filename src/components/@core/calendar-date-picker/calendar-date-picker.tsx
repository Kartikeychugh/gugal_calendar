import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { CalendarViewContext } from "../../../contexts/calendar-view/calendar-view.context";

export const CalendarDatePicker = () => {
  const { selectedDate, setCalendarSelectedDate } =
    useContext(CalendarViewContext);

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
