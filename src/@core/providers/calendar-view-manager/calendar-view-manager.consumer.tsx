import { useContext } from "react";
import { CalendarViewManagerContext } from "./calendar-view-manager.context";

export const useCalendarViewManager = () => {
  return useContext(CalendarViewManagerContext);
};
