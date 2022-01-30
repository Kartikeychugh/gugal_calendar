import { Box } from "@mui/material";
import { useContext } from "react";
import { extractEventForDay, transformEvents } from "../../../../utils";
import { useCalendarEventDetails } from "../../../providers/calendar-events-details";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";
import { CalendarSurfaceEventCardReusable } from "../calendar-surface-event-card/calendar-surface-event-card.reusable";

export const CalendarSurfaceEventColumnReusable = (props: { date: Date }) => {
  const {
    currentView: { numberOfDays },
    dimensions: { cellHeight },
  } = useContext(CalendarViewContextReusable);
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
        <CalendarSurfaceEventCardReusable key={event.id} event={event} />
      ))}
    </Box>
  );
};
