import { useCalendarColors } from "../../firebase/api/hooks/use-calendar-colors";
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

export const CalendarEventColumn = () => {
  const events = useCalendarEvents();
  return (
    <div className="event-grid-column">
      {events?.length ? (
        <>
          <EventCard event={events[0]} />
        </>
      ) : null}
    </div>
  );
};

const calculateCoordinate = (event: CalendarEventItem) => {
  const eventDate = new Date(event.start.dateTime);
  const x = eventDate.getDay();
  const y = eventDate.getHours();

  return { x: x, y: y };
};

// const events = useCalendarEvents();
// const colors = useCalendarColors();

// return colors ? (
//   <div className="calendar-event-grid-container">
//     {events &&
//       events.map((event) => {
//         const { x, y } = calculateCoordinate(event);
//         return (
//           <div className="calendar-event-holder">
//             <EventCard colors={colors} event={event} />
//           </div>
//         );
//       })}
//   </div>
// ) : null;
