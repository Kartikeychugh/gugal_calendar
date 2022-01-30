import { Box } from "@mui/material";
import { transformEvents } from "../../../../utils";
import { CalendarSurfaceEventCardReusable } from "../calendar-surface-event-card/calendar-surface-event-card.reusable";

export const CalendarSurfaceEventColumnReusable = (props: {
  events: CalendarEventItem[] | undefined;
  numberOfDaysInTheView: number;
  minCellHeight: number;
  colors: CalendarColors;
}) => {
  const { events = [], minCellHeight, colors } = props;
  let transformedEvents = transformEvents(events, minCellHeight, colors);

  return (
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        width: `calc(${100 / props.numberOfDaysInTheView}% - 15px)`,
      }}
    >
      {transformedEvents.map((event) => (
        <CalendarSurfaceEventCardReusable key={event.id} event={event} />
      ))}
    </Box>
  );
};
