import { useCalendarCommands } from "../../firebase/api/hooks/use-calendar-commands";
import { EventCard } from "../event-card/event-card.component";
import "./calendar-event-grid.css";

export const CalendarEventGrid = () => {
  const events = useCalendarCommands();

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="calendar-event-grid-container">
      {events.map((event) => {
        const { x, y } = calculateCoordinate(event);
        return <EventCard x={x} y={y} event={event} />;
      })}
    </div>
  );
};

const calculateCoordinate = (event: CalendarEventItem) => {
  const eventDate = new Date(event.start.dateTime);
  const x = eventDate.getDay();
  const y = eventDate.getHours();

  return { x: x, y: y };
};
