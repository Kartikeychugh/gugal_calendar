import { PropsWithChildren } from "react";
import { ICalendarEvent } from "../../models";
import { CalendarEventDetailsContext } from "./calendar-events-details.context";

export const CalendarEventsDetailsProvider = (
  props: PropsWithChildren<{
    events: ICalendarEvent[];
  }>
) => {
  const { events } = props;
  return (
    <CalendarEventDetailsContext.Provider value={{ events }}>
      {props.children}
    </CalendarEventDetailsContext.Provider>
  );
};
