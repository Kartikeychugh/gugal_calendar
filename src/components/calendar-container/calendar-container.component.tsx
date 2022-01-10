import { useCalendarCommands } from "../../firebase/api/hooks/use-calendar-commands";

export const CalendarContainer = () => {
  const events = useCalendarCommands();
  return (
    <>
      {events.map((event) => (
        <div key={event.id}>
          <h4>
            {event.start.dateTime} to {event.end.dateTime}
          </h4>
          <h3>{event.summary}</h3>
        </div>
      ))}
    </>
  );
};
