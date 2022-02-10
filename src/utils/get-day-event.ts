import { ICalendarEvent } from "../@core";

export const extractEventForDay = (
  events: ICalendarEvent[] | undefined,
  date: Date
) => {
  if (!events) {
    return undefined;
  }
  return events.filter((event) => {
    return new Date(event.start.dateTime).getDate() === date.getDate();
  });
};
