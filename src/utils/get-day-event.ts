export const extractEventForDay = (
  events: CalendarEventItem[] | undefined,
  date: Date
) => {
  if (!events) {
    return undefined;
  }
  return events.filter(
    (event) =>
      new Date(event.start.dateTime).getDate() === new Date(date).getDate()
  );
};
