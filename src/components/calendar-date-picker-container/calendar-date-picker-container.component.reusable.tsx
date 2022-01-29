import { Paper } from "@mui/material";
import { CalendarDatePickerReusable } from "../../@core/components/@api/calendar-date-picker/calendar-date-picker.reusable";

export const CalendarDatePickerContainerReusable = (props: {
  selectedDate: number;
  setCalendarSelectedDate: (newSelectedDate: number) => void;
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "10px",
        backgroundColor: "rgb(25, 118, 210, 0.07)",
        "& .MuiCalendarPicker-root": {
          minWidth: "300px",
        },
      }}
    >
      <CalendarDatePickerReusable {...props} />
    </Paper>
  );
};
