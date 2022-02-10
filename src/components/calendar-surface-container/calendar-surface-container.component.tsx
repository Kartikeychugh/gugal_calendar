import { Paper } from "@mui/material";
import {
  CalendarSurface,
  ICalendarEventItem,
  ICalendarFeatureFlags,
  ICalendarClientEventItem,
} from "../../@core";

export const CalendarSurfaceContainer = (props: {
  events: (ICalendarEventItem | ICalendarClientEventItem)[];
  colors: CalendarColors | null;
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
      elevation={19}
      sx={{
        borderRadius: "0px",
        width: "100%",
        padding: `${16}px`,
        height: "100%",
      }}
    >
      <CalendarSurface {...props} />
    </Paper>
  );
};
