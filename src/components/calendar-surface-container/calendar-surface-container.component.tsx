import { Paper } from "@mui/material";
import {
  CalendarSurface,
  ICalendarFeatureFlags,
  ICalendarClientEventItem,
  ICalendarEvent,
} from "../../@core";

export const CalendarSurfaceContainer = (props: {
  events: (ICalendarEvent | ICalendarClientEventItem)[];
  userViewId: number;
  selectedDate: number;
  minCellHeight: number;
  minColumnWidth: number;
  featureFlags?: ICalendarFeatureFlags;
  onHeaderClick?: (date: number) => void;
  onCellClick: (start: Date, end: Date) => void;
  onSelectedDateChange: (newDate: number) => void;
  onViewChange?: (newViewId: number) => void;
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: "0px",
        width: "100%",
        padding: `${16}px`,
        height: "100%",
        background: "background.default",
      }}
    >
      <CalendarSurface {...props} />
    </Paper>
  );
};
