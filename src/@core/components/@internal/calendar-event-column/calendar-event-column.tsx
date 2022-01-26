import { Box } from "@mui/material";
import { useContext } from "react";
import { transformEvents } from "../../../../utils";
import { CalendarDimensionsContext } from "../../../providers";
import { EventCard } from "../event-card";

export const CalendarSurfaceEventColumn = (props: {
  events: CalendarEventItem[] | undefined;
  view: number;
}) => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  const { events = [] } = props;
  let transformedEvents = transformEvents(
    events,
    calendarDimensionsValue.minCellHeight
  );

  return (
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        width: `calc(${100 / props.view}% - 15px)`,
      }}
    >
      {transformedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
};
