import { useState, useRef } from "react";
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
      style={{
        pointerEvents: "none",
        width: `calc(${100 / props.view}% - ${75 / props.view}px - 30px)`,
      }}
      className="event-grid-column">
      {transformedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
