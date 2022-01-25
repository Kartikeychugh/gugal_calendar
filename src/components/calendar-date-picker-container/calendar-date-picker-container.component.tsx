import { Paper } from "@mui/material";
import { CalendarDatePicker } from "../../@core";

export const CalendarDatePickerContainer = () => {
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
      <CalendarDatePicker />
    </Paper>
  );
};
