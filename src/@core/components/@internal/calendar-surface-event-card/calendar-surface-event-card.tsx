import { Box, Zoom } from "@mui/material";
import { ICalendarEventItem } from "../../../models";
import { EventCardDetailsHolders } from "./event-card-details-holder";

export const CalendarSurfaceEventCard = (props: {
  event: ICalendarEventItem;
}) => {
  const { event } = props;
  return (
    <Zoom in={!!event} style={{ transitionDelay: "10ms" }} unmountOnExit>
      <Box
        key={props.event.id}
        sx={{
          display: "flex",
          cursor: "pointer",
          pointerEvents: "all",
          position: "absolute",
          top: event.layout.top,
          height: event.layout.height,
          width: event.layout.width,
          left: event.layout.left,
          overflow: "hidden",
          borderRadius: "0 5px 5px 0",
          transition: "0s all ease-in-out",
          boxShadow: "0px 1px 4px 2px rgba(18,18,18,0.5)",
        }}
      >
        <EventCardDetailsHolders event={event} />
      </Box>
    </Zoom>
  );
};
