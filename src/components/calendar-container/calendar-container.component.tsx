import { Box } from "@mui/material";

import { ICalendarEventItem } from "../../models";
import { CalendarDatePickerContainer } from "../calendar-date-picker-container";
import { CalendarSurfaceContainer } from "../calendar-surface-container";

export const CalendarContainer = (props: {
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
          <CalendarDatePickerContainer
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
          />
        </Box>
        <Box sx={{ height: "100%", flexGrow: 1 }}>
          <CalendarSurfaceContainer {...props} />
        </Box>
      </Box>
    </Box>
  );
};
