export const extractEventForDay = (
  events: CalendarEventItem[] | undefined,
  date: Date
) => {
  if (!events) {
    return undefined;
  }
  return events.filter((event) => {
    return new Date(event.start.dateTime).getDate() === date.getDate();
  });
};
