import { transformEvents } from "../../utils/transform-events";

import { EventCard } from "../event-card/event-card.component";
import "./calendar-event-grid.css";

export const CalendarEventColumn = (props: {
  events: CalendarEventItem[] | undefined;
  view: number;
}) => {
  const { events = [] } = props;
  let transformedEvents = transformEvents(events);

  return (
    <div
      style={{ width: `calc(${100 / props.view}% - 30px)` }}
      className="event-grid-column">
      {transformedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
