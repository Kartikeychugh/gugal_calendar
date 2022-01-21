import { Box } from "@mui/material";
import { startOfToday } from "date-fns";
import { useCalendarEvents } from "../../hooks/use-calendar-events";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { useSelector } from "../../redux/hooks/use-selector";
import { CalendarColumnsRenderer } from "../calendar-column";
import { CalendarHeader } from "../calendar-header/calendar-header.component";
import { CalendarTimeMarker } from "../calendar-time-marker";
import { CalendarGridTime } from "./calendar-grid-time";

export const CalendarGrid = (props: {
  cellSize: number;
  timeGridWidth: number;
}) => {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <CalendarHeader timeGridWidth={props.timeGridWidth} />
      <ScrollableGrid
        cellSize={props.cellSize}
        timeGridWidth={props.timeGridWidth}
      />
    </Box>
  );
};

const ScrollableGrid = (props: { cellSize: number; timeGridWidth: number }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        overflowY: "scroll",
        width: "100%",
        height: "calc(100vh - 175px)",
      }}>
      <CalendarSurfaceGrid
        timeGridWidth={props.timeGridWidth}
        cellSize={props.cellSize}
      />
    </Box>
  );
};

export const CalendarSurfaceGrid = (props: {
  cellSize: number;
  timeGridWidth: number;
}) => {
  const events = useCalendarEvents();

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarGridTime
        timeGridWidth={props.timeGridWidth}
        cellSize={props.cellSize}
      />
      <CalendarGridRenderer cellSize={props.cellSize} events={events} />
    </Box>
  );
};

const CalendarGridRenderer = (props: {
  cellSize: number;
  events: ICalendarEventItem[];
}) => {
  const { fromDay, numberOfDays } = useSelector((state) => state.view);

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarTimeMarker
        cellSize={props.cellSize}
        view={numberOfDays}
        diff={startOfToday().getDay() - fromDay}
      />
      <CalendarColumnsRenderer {...props} />
    </Box>
  );
};
