import { Box } from "@mui/material";
import { useContext, useRef } from "react";
import {
  CalendarDimensionsContext,
  CalendarSurfaceSizeWatcher,
  useCalendarView,
} from "../../..";
import { ICalendarEventItem } from "../../../../models";
import { extractEventForDay } from "../../../../utils";
import { CalendarSurfaceEventColumn } from "../calendar-surface-event-column";
import { CalendarSurfaceGridColumn } from "../calendar-surface-grid-column";

export const CalendarSurfaceColumns = (props: {
  events: ICalendarEventItem[];
}) => {
  const {
    currentView: { numberOfDays },
    currentDates,
  } = useCalendarView();

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <CalendarSurfaceSizeWatcher containerRef={containerRef}>
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        {currentDates.map((day, i) => (
          <CalendarSurfaceColumn
            events={props.events}
            lastColumn={i + 1 === currentDates.length}
            datetime={day}
            key={i}
            view={numberOfDays}
          />
        ))}
      </Box>
    </CalendarSurfaceSizeWatcher>
  );
};

const CalendarSurfaceColumn = (props: {
  datetime: Date;
  events: CalendarEventItem[] | undefined;
  lastColumn: boolean;
  view: number;
}) => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        minWidth: `${calendarDimensionsValue.minColumnWidth}px`,
      }}
    >
      <CalendarSurfaceEventColumn
        view={props.view}
        events={extractEventForDay(props.events, props.datetime)}
      />
      <CalendarSurfaceGridColumn
        view={props.view}
        datetime={props.datetime}
        lastColumn={props.lastColumn}
      />
    </Box>
  );
};
