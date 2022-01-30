import { Box, Paper } from "@mui/material";
import { startOfToday } from "date-fns";
import { CalendarDatePickerReusable } from "../../@core/components/@api/calendar-date-picker/calendar-date-picker.reusable";
import { CalendarSurfaceReusable } from "../../@core/components/@api/calendar-surface/calendar-surface.reusable";
import { useCalendarEventsReusable } from "../../hooks/use-calendar-events.reusable";
import { ICalendarEventItem } from "../../models";

export const CalendarDatePickerContainerReusable = (props: {
  colors: CalendarColors; //fine
  onHeaderClick: (date: number) => void; //fine
  onCellClick: (date: Date, hour: number) => void; //fine
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
  dimensions: {
    minCellHeight: number;
    timeGridWidth: number;
    minColumnWidth: number;
  };
}) => {
  const { selectedDate, ...other } = props;
  const today = startOfToday().valueOf();
  const events = useCalendarEventsReusable(today);
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        height: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        backgroundColor: "rgb(25, 118, 210, 0.07)",
        "& .MuiCalendarPicker-root": {
          minWidth: "300px",
        },
      }}
    >
      <Box sx={{ height: "330px" }}>
        <CalendarDatePickerReusable
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
        />
      </Box>
      {/* <Box sx={{ height: "calc(100% - 330px)", width: "350px" }}>
        <CalendarSurfaceReusable
          {...other}
          selectedDate={today}
          userViewId={0}
          hideCommandBar={true}
          events={events}
        />
      </Box> */}
    </Paper>
  );
};
