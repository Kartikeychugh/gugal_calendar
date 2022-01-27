import { Box } from "@mui/material";
import { startOfToday } from "date-fns";
import { useContext, useRef } from "react";
import {
  CalendarDimensionsContext,
  CalendarDimensionsProvider,
} from "../../../providers";
import { useCalendarEvents } from "../../../../hooks";
import { ICalendarEventItem } from "../../../../models";
import { CalendarSurfaceColumns } from "../calendar-surface-column";
import { CalendarSurfaceTimeMarker } from "../calendar-surface-time-marker";
import { useCalendarView, useSizeWatcher } from "../../../hooks";
import { CalendarSurfaceTimeGrid } from "../calendar-surface-time-grid";

export const CalendarSurfaceScrollableGrid = () => {
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
      <CalendarSurfaceTimeGrid />
      <CalendarSurfaceGridRenderer events={events} />
    </Box>
  );
};

const CalendarSurfaceGridRenderer = (props: {
  events: ICalendarEventItem[];
}) => {
  const { currentView } = useCalendarView();
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
