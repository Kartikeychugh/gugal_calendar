import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";

export const CalendarDatePicker = React.memo(
  (props: {
    selectedDate: number;
    onSelectedDateChange: (newSelectedDate: number) => void;
  }) => {
    const { selectedDate, onSelectedDateChange } = props;

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={new Date(selectedDate)}
          onChange={(newValue) => {
            if (!newValue) {
              return;
            }
            onSelectedDateChange(newValue.valueOf());
          }}
        />
      </LocalizationProvider>
    );
  }
);
