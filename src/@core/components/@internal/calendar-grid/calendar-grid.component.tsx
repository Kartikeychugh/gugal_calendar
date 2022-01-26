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
import { CalendarSurfaceColumns } from "../calendar-column";
import { CalendarSurfaceHeader } from "../calendar-header";
import { CalendarSurfaceTimeMarker } from "../calendar-time-marker";
import { CalendarSurfaceGridTime } from "./calendar-grid-time";
import { useSizeWatcher } from "../../../hooks";

export const CalendarSurfaceRenderer = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CalendarSurfaceHeader />
      <CalendarSurfaceScrollableGrid />
    </Box>
  );
};

const CalendarSurfaceScrollableGrid = () => {
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

const CalendarSurfaceGrid = () => {
  const events = useCalendarEvents();

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <CalendarSurfaceGridTime />
      <CalendarSurfaceGridRenderer events={events} />
    </Box>
  );
};

const CalendarSurfaceGridRenderer = (props: {
  events: ICalendarEventItem[];
}) => {
  const { currentView } = useContext(CalendarViewContext);
  const { fromDay, numberOfDays } = currentView;

  return (
    <Box sx={{ display: "flex", position: "relative", width: "100%" }}>
      <CalendarSurfaceTimeMarker
        view={numberOfDays}
        diff={startOfToday().getDay() - fromDay}
      />
      <CalendarSurfaceColumns {...props} />
    </Box>
  );
};
