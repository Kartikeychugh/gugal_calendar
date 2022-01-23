import { Box } from "@mui/material";
import { useContext } from "react";
import { CalendarDimensionsContext } from "../../contexts";
import { transformEvents } from "../../utils/transform-events";

import { EventCard } from "../event-card/event-card.component";

export const CalendarEventColumn = (props: {
  events: CalendarEventItem[] | undefined;
  view: number;
}) => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  const { events = [] } = props;
  let transformedEvents = transformEvents(
    events,
    calendarDimensionsValue.cellHeight
  );

  return (
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        width: `calc(${100 / props.view}% - 20px)`,
      }}>
      {transformedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
};
