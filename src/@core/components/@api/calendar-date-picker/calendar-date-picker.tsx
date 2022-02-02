import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";

export const CalendarDatePicker = React.memo(
  (props: {
    selectedDate: number;
    setSelectedDate: (newSelectedDate: number) => void;
  }) => {
    const { selectedDate, setSelectedDate } = props;

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={new Date(selectedDate)}
          onChange={(newValue) => {
            if (!newValue) {
              return;
            }
            setSelectedDate(newValue.valueOf());
          }}
        />
      </LocalizationProvider>
    );
  }
);
