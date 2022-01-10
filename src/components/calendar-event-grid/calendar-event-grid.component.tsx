import { useCalendarColors } from "../../firebase/api/hooks/use-calendar-colors";
import { useCalendarCommands } from "../../firebase/api/hooks/use-calendar-commands";
import { EventCard } from "../event-card/event-card.component";
import "./calendar-event-grid.css";

export const CalendarEventGrid = () => {
  const events = useCalendarCommands();
  const colors = useCalendarColors();

  return colors ? (
    <div className="calendar-event-grid-container">
      {events.map((event) => {
        const { x, y } = calculateCoordinate(event);
        return (
          <div
            className="calendar-event-holder"
            style={{
              top: `calc((100vh/12)*${y})`,
              left: `calc((100vw/7)*${x})`,
            }}>
            <EventCard colors={colors} event={event} />
          </div>
        );
      })}
    </div>
  ) : null;
};

const calculateCoordinate = (event: CalendarEventItem) => {
  const eventDate = new Date(event.start.dateTime);
  const x = eventDate.getDay();
  const y = eventDate.getHours();

  return { x: x, y: y };
};
