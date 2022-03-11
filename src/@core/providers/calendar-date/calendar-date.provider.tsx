import { PropsWithChildren } from "react";
import { CalendarDateContext } from "./calendar-date.context";

export const CalendarDateProvider = (
  props: PropsWithChildren<{
    selectedDate: number;
    onSelectedDateChange: (newDate: number) => void;
  }>
) => {
  const { selectedDate, onSelectedDateChange } = props;
  return (
    <CalendarDateContext.Provider
      value={{ selectedDate, onSelectedDateChange }}
    >
      {props.children}
    </CalendarDateContext.Provider>
  );
};
