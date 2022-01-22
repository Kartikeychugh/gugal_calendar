import { Box } from "@mui/material";
import { startOfToday } from "date-fns";
import { useCalendarEvents } from "../../hooks/use-calendar-events";
import { useView } from "../../hooks/use-view";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { CalendarColumnsRenderer } from "../calendar-column";
import { CalendarHeader } from "../calendar-header/calendar-header.component";
import { CalendarTimeMarker } from "../calendar-time-marker";
import { CalendarGridTime } from "./calendar-grid-time";

export const CalendarGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <CalendarHeader />
      <ScrollableGrid />
    </Box>
  );
};

const ScrollableGrid = () => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        overflowY: "scroll",
        width: "100%",
        height: "calc(100vh - 175px)",
      }}>
      <CalendarSurfaceGrid />
    </Box>
  );
};

export const CalendarSurfaceGrid = () => {
  const events = useCalendarEvents();

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarGridTime />
      <CalendarGridRenderer events={events} />
    </Box>
  );
};

const CalendarGridRenderer = (props: { events: ICalendarEventItem[] }) => {
  const { fromDay, numberOfDays } = useView();

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarTimeMarker
        view={numberOfDays}
        diff={startOfToday().getDay() - fromDay}
      />
      <CalendarColumnsRenderer {...props} />
    </Box>
  );
};
