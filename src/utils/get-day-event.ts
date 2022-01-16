export const extractEventForDay = (
  events: CalendarEventItem[] | undefined,
  date: string
) => {
  if (!events) {
    return undefined;
  }
  return events.filter(
    (event) =>
      new Date(event.start.dateTime).getDate() === new Date(date).getDate()
  );
};
