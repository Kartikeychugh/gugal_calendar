import { useContext } from "react";
import { CalendarViewContext } from "./calendar-view.context";

export const useCalendarView = () => {
  return useContext(CalendarViewContext);
};
