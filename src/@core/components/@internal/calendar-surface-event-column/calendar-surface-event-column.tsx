import { Box } from "@mui/material";
import { useContext } from "react";
import { extractEventForDay, transformEvents } from "../../../../utils";
import { CalendarViewContext } from "../../../providers";
import { useCalendarEventDetails } from "../../../providers/calendar-events-details";
import { CalendarSurfaceEventCard } from "../calendar-surface-event-card";

export const CalendarSurfaceEventColumn = (props: { date: Date }) => {
  const {
    currentView: { numberOfDays },
    dimensions: { cellHeight },
  } = useContext(CalendarViewContext);
  const { colors, events } = useCalendarEventDetails();
  let transformedEvents = transformEvents(
    extractEventForDay(events, props.date) || [],
    cellHeight,
    colors
  );

  return (
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        width: `calc(${100 / numberOfDays}% - 15px)`,
      }}
    >
      {transformedEvents.map((event) => (
        <CalendarSurfaceEventCard key={event.id} event={event} />
      ))}
    </Box>
  );
};
