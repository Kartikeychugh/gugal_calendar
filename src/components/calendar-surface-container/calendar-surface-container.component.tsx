import { Paper } from "@mui/material";
import {
  CalendarSurface,
  ICalendarFeatureFlags,
  ICalendarClientEventItem,
  ICalendarEvent,
} from "../../@core";
import { EventCardDetailsHolders } from "../calendar-surface-event-card";

export const CalendarSurfaceContainer = (props: {
  events: (ICalendarEvent | ICalendarClientEventItem)[];
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  userViewId: number;
  selectedDate: number;
  onSelectedDateChange: (newDate: number) => void;
  minCellHeight: number;
  minColumnWidth: number;
  featureFlags?: ICalendarFeatureFlags;
  onViewChange?: (newViewId: number) => void;
}) => {
  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: "0px",
        width: "100%",
        padding: `${16}px`,
        height: "100%",
        background: "background.default",
      }}
    >
      <CalendarSurface {...props} RenderEventCard={EventCardDetailsHolders} />
    </Paper>
  );
};
