import { startOfToday } from "date-fns";
import { createContext } from "react";

export interface CalendarDate {
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
}

export const CalendarDateContext = createContext<CalendarDate>({
  selectedDate: startOfToday().valueOf(),
  setSelectedDate: () => {
    throw Error("setSelectedDate prop missing");
  },
});
