import { useContext } from "react";
import { CalendarDateContext } from "./calendar-date.context";

export const useCalendarDate = () => {
  return useContext(CalendarDateContext);
};
