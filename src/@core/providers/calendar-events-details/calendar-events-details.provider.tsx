import { PropsWithChildren } from "react";
import { ICalendarEventItem } from "../../models";
import { CalendarEventDetailsContext } from "./calendar-events-details.context";

export const CalendarEventsDetailsProvider = (
  props: PropsWithChildren<{
    events: ICalendarEventItem[];
    colors: CalendarColors;
  }>
) => {
  const { events, colors } = props;
  return (
    <CalendarEventDetailsContext.Provider
      value={{ events, colors, defaultColorId: 1 }}
    >
      {props.children}
    </CalendarEventDetailsContext.Provider>
  );
};
