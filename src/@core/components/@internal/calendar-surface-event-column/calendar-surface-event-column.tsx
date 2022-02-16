import { Box } from "@mui/material";
import { extractEventForDay, transformEvents } from "../../../../utils";
import { ICalendarEventItem } from "../../../models";
import {
  useCalendarViewManager,
  useCalendarEventDetails,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";
import { CalendarSurfaceEventCard } from "../calendar-surface-event-card";

export const CalendarSurfaceEventColumn = (props: {
  date: Date;
  CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const {
    currentView: { numberOfDays },
  } = useCalendarViewManager();
  const { cellHeight } = useCalendarDimensionCellHeightContext();
  const { events } = useCalendarEventDetails();
  let transformedEvents = transformEvents(
    extractEventForDay(events, props.date) || [],
    cellHeight
  );

  const { CientEventCard } = props;
  return (
    //TODO
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        width: `calc(${100 / numberOfDays}% - 15px)`,
      }}
    >
      {transformedEvents.map((event) => (
        <CalendarSurfaceEventCard
          key={event.id}
          event={event}
          CientEventCard={CientEventCard}
        />
      ))}
    </Box>
  );
};
