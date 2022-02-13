import { PropsWithChildren } from "react";
import { CalendarDateContext } from "./calendar-date.context";

export const CalendarDateProvider = (
  props: PropsWithChildren<{
    selectedDate: number;
    setSelectedDate: (newDate: number) => void;
  }>
) => {
  const { selectedDate, setSelectedDate } = props;
  return (
    <CalendarDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {props.children}
    </CalendarDateContext.Provider>
  );
};
