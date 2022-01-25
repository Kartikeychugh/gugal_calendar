import { Box } from "@mui/material";
import { addDays, startOfWeek } from "date-fns";
import { useContext, useRef } from "react";
import {
  CalendarDimensionsContext,
  CalendarSurfaceSizeWatcher,
} from "../../..";
import { CalendarViewContext } from "../../../providers";
import { ICalendarEventItem } from "../../../../models";
import { extractEventForDay, getWeekDetails } from "../../../../utils";
import { CalendarEventColumn } from "../calendar-event-column";
import { CalendarGridColumn } from "../calendar-grid-column";

export const CalendarColumnsRenderer = (props: {
  events: ICalendarEventItem[];
}) => {
  const { currentView, selectedDate } = useContext(CalendarViewContext);
  const { fromDay, numberOfDays } = currentView;
  const start = startOfWeek(selectedDate);
  const { week } = getWeekDetails(addDays(start, fromDay), numberOfDays);
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
        {week.map((day, i) => (
          <CalendarColumn
            events={props.events}
            lastColumn={i + 1 === week.length}
            datetime={day}
            key={i}
            view={numberOfDays}
          />
        ))}
      </Box>
    </CalendarSurfaceSizeWatcher>
  );
};

const CalendarColumn = (props: {
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
        minWidth: `${calendarDimensionsValue.columnMinWidth}px`,
      }}
    >
      <CalendarEventColumn
        view={props.view}
        events={extractEventForDay(props.events, props.datetime)}
      />
      <CalendarGridColumn
        view={props.view}
        datetime={props.datetime}
        lastColumn={props.lastColumn}
      />
    </Box>
  );
};
