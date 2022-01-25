import { Box } from "@mui/material";
import { startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarViewContext } from "../../../providers";
import { useCalendarEvents } from "../../../../hooks";
import { ICalendarEventItem } from "../../../../models";
import { CalendarColumnsRenderer } from "../calendar-column";
import { CalendarHeader } from "../calendar-header";
import { CalendarTimeMarker } from "../calendar-time-marker";
import { CalendarGridTime } from "./calendar-grid-time";

export const CalendarGrid = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CalendarHeader />
      <ScrollableGrid />
    </Box>
  );
};

const ScrollableGrid = () => {
  return (
    <Box
      sx={
        {
          overflowY: "overlay",
          width: "100%",
        } as any
      }
    >
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
  const { currentView } = useContext(CalendarViewContext);
  const { fromDay, numberOfDays } = currentView;

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
