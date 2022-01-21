import { Box } from "@mui/material";
import { addDays } from "date-fns";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { useSelector } from "../../redux/hooks/use-selector";
import { extractEventForDay } from "../../utils/get-day-event";
import { getViewDetails } from "../../utils/get-view-details";
import { CalendarEventColumn } from "../calendar-event-column";
import { CalendarGridColumn } from "../calendar-grid-column";

export const CalendarColumnsRenderer = (props: {
  cellSize: number;
  events: ICalendarEventItem[];
}) => {
  const { start } = useSelector((state) => state.window);
  const { fromDay, numberOfDays } = useSelector((state) => state.view);
  const view = getViewDetails(addDays(start, fromDay), numberOfDays);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
      }}>
      {view.week.map((day, i) => (
        <CalendarColumn
          cellSize={props.cellSize}
          events={props.events}
          lastColumn={i + 1 === numberOfDays}
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
  cellSize: number;
}) => {
  return (
    <Box sx={{ height: "100%", width: "100%", minWidth: "64px" }}>
      <CalendarEventColumn
        cellSize={props.cellSize}
        view={props.view}
        events={extractEventForDay(props.events, props.datetime)}
      />
      <CalendarGridColumn
        cellSize={props.cellSize}
        view={props.view}
        datetime={props.datetime}
        lastColumn={props.lastColumn}
      />
    </Box>
  );
};
