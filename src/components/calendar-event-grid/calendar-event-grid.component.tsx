import { useCalendarEvents } from "../../firebase/api/hooks/use-calendar-events";
import { EventCard } from "../event-card/event-card.component";
import "./calendar-event-grid.css";

export const CalendarEventGrid = () => {
  const columns = [];

  for (let i = 0; i < 5; i++) {
    columns.push(<div className="event-grid-column"></div>);
  }

  return <div className="event-grid-container">{columns}</div>;
};

export const CalendarEventColumn = (props: { datetime: number }) => {
  const events = useCalendarEvents(props.datetime);
  return (
    <div className="event-grid-column">
      {events &&
        events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
};
