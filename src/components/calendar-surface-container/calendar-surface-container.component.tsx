import { Paper } from "@mui/material";
import {
  CalendarSurface,
  ICalendarFeatureFlags,
  ICalendarClientEventItem,
  ICalendarEvent,
} from "../../@core";

export const CalendarSurfaceContainer = (props: {
  events: (ICalendarEvent | ICalendarClientEventItem)[];
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  userViewId: number;
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
  minCellHeight: number;
  minColumnWidth: number;
  featureFlags?: ICalendarFeatureFlags;
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
      <CalendarSurface {...props} />
    </Paper>
  );
};
