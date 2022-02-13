import { useContext } from "react";
import { CalendarAvailableViewsContext } from "./calendar-available-views.context";

export const useCalendarAvailableViews = () => {
  return useContext(CalendarAvailableViewsContext);
};
