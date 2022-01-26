import { Box } from "@mui/material";
import { startOfToday } from "date-fns";
import { useContext, useRef } from "react";
import {
  CalendarDimensionsContext,
  CalendarDimensionsProvider,
  CalendarViewContext,
} from "../../../providers";
import { useCalendarEvents } from "../../../../hooks";
import { ICalendarEventItem } from "../../../../models";
import { CalendarColumnsRenderer } from "../calendar-column";
import { CalendarHeader } from "../calendar-header";
import { CalendarTimeMarker } from "../calendar-time-marker";
import { CalendarGridTime } from "./calendar-grid-time";
import { useSizeWatcher } from "../../../hooks";

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
  const value = useContext(CalendarDimensionsContext);
  const ref = useRef(null);
  const width = useSizeWatcher(ref, "height");

  return (
    <Box
      ref={ref}
      sx={
        {
          overflowY: "overlay",
          width: "100%",
        } as any
      }
    >
      <CalendarDimensionsProvider
        value={{
          ...value,
          minCellHeight:
            width === 0
              ? value.minCellHeight
              : Math.max(width / 12, value.minCellHeight),
        }}
      >
        <CalendarSurfaceGrid />
      </CalendarDimensionsProvider>
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
