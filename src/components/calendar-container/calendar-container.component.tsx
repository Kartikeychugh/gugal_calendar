import { Box } from "@mui/material";
import {
  ICalendarFeatureFlags,
  ICalendarClientEventItem,
  ICalendarEvent,
} from "../../@core";

import { CalendarDatePickerContainer } from "../calendar-date-picker-container";
import { CalendarSurfaceContainer } from "../calendar-surface-container";

export const CalendarContainer = (props: {
  events: (ICalendarEvent | ICalendarClientEventItem)[];
  userViewId: number;
  selectedDate: number;
  minCellHeight: number;
  minColumnWidth: number;
  onHeaderClick?: (date: number) => void;
  onCellClick: (start: Date, end: Date) => void;
  onSelectedDateChange: (newDate: number) => void;
  onViewChange?: (newViewId: number) => void;
  hideCommandBar?: boolean;
  responsiveCellHeight?: boolean;
}) => {
  console.log("CalendarContainer");

  return (
    <Box
      sx={{
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
            onSelectedDateChange={props.onSelectedDateChange}
          />
        </Box>
        <Box sx={{ height: "100%", flexGrow: 1 }}>
          <CalendarSurfaceContainer {...props} />
        </Box>
      </Box>
    </Box>
  );
};
