import { Paper } from "@mui/material";
import { CalendarSurfaceReusable } from "../../@core/components/@api/calendar-surface/calendar-surface.reusable";
import { ICalendarEventItem } from "../../models";

export const CalendarSurfaceContainerReusable = (props: {
  events: ICalendarEventItem[];
  colors: CalendarColors;
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  userViewId: number;
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
  dimensions: {
    minCellHeight: number;
    timeGridWidth: number;
    minColumnWidth: number;
  };
}) => {
  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: "10px 10px 10px 10px",
        width: "100%",
        padding: `${16}px`,
        height: "100%",
      }}
    >
      <CalendarSurfaceReusable {...props} />
    </Paper>
  );
};
