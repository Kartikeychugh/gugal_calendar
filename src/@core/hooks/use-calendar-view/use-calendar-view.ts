import { useContext } from "react";
import { CalendarViewContext } from "../../providers";

export const useCalendarView = () => {
  return useContext(CalendarViewContext);
};
