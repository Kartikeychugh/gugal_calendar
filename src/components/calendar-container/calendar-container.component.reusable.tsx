import { Box } from "@mui/material";

import { CalendarSurfaceContainerReusable } from "../calendar-surface-container/calendar-surface-container.component.reusable";
import { ICalendarEventItem } from "../../models";
import { CalendarDatePickerContainerReusable } from "../calendar-date-picker-container/calendar-date-picker-container.component.reusable";

export const CalendarContainerReusable = (props: {
  events: ICalendarEventItem[]; //fine
  colors: CalendarColors; //fine
  onHeaderClick: (date: number) => void; //fine
  onCellClick: (date: Date, hour: number) => void; //fine
  userViewId: number; //fine
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
  dimensions: {
    minCellHeight: number;
    timeGridWidth: number;
    minColumnWidth: number;
  };
}) => {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ height: "100%" }}>
          <CalendarDatePickerContainerReusable {...props} />
        </Box>
        <Box sx={{ height: "100%", flexGrow: 1 }}>
          <CalendarSurfaceContainerReusable {...props} />
        </Box>
      </Box>
    </Box>
  );
};
