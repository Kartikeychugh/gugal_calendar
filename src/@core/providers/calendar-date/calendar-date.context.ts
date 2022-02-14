import { startOfToday } from "date-fns";
import { createContext } from "react";

export interface CalendarDate {
  selectedDate: number;
  onSelectedDateChange: (newDate: number) => void;
}

export const CalendarDateContext = createContext<CalendarDate>({
  selectedDate: startOfToday().valueOf(),
  onSelectedDateChange: () => {
    throw Error("onSelectedDateChange prop missing");
  },
});
