import { Box, useTheme } from "@mui/material";
import { ICalendarEventItem } from "../../../models";
import { EventCardDetailsHolders } from "./event-card-details-holder";

export const CalendarSurfaceEventCard = (props: {
  event: ICalendarEventItem;
}) => {
  const { event } = props;
  const theme = useTheme();
  return (
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
        borderRadius: "5px",
        transition: "0.1s all ease-in-out",
        borderLeft: `6px outset ${event.colors.calendar.backgroundColor}`,
        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 0px 15px 3px rgba(255,255,255, 0.1)"
              : "0px 0px 5px 4px rgba(0,0,0, 0.2)",
          zIndex: 1,
        },
      }}
    >
      {/* <Box
        sx={{
          background: event.colors.calendar.backgroundColor,
          minWidth: "3px",
        }}
      /> */}
      <EventCardDetailsHolders event={event} />
    </Box>
  );
};
