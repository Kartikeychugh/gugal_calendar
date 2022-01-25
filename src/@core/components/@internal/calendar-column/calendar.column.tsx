import { Box } from "@mui/material";
import { addDays, startOfWeek } from "date-fns";
import { useContext } from "react";
import { CalendarDimensionsContext } from "../../..";
import { CalendarViewContext } from "../../../providers/calendar-view/calendar-view.context";
import { ICalendarEventItem } from "../../../../models/calendar-event-item";
import { extractEventForDay } from "../../../../utils/get-day-event";
import { getWeekDetails } from "../../../../utils/get-view-details";
import { CalendarEventColumn } from "../calendar-event-column";
import { CalendarGridColumn } from "../calendar-grid-column";

export const CalendarColumnsRenderer = (props: {
  events: ICalendarEventItem[];
}) => {
  const { currentView, selectedDate } = useContext(CalendarViewContext);
  const { fromDay, numberOfDays } = currentView;
  const start = startOfWeek(selectedDate);
  const { week } = getWeekDetails(addDays(start, fromDay), numberOfDays);

  return (
    <Box
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
