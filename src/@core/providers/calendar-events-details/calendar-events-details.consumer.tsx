import { useContext } from "react";
import { CalendarEventDetailsContext } from "./calendar-events-details.context";

export const useCalendarEventDetails = () => {
  return useContext(CalendarEventDetailsContext);
};
