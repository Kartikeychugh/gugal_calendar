import { Box, Paper } from "@mui/material";
import React from "react";
import { CalendarDatePicker } from "../../@core";

export const CalendarDatePickerContainer = React.memo((props: {
  selectedDate: number;
  onSelectedDateChange: (newDate: number) => void;
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        height: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: "0px",
        // backgroundColor: "rgb(25, 118, 210, 0.07)",
        "& .MuiCalendarPicker-root": {
          minWidth: "300px",
        },
      }}
    >
      <Box sx={{ height: "330px" }}>
        <CalendarDatePicker
          selectedDate={props.selectedDate}
          onSelectedDateChange={props.onSelectedDateChange}
        />
      </Box>
    </Paper>
  );
});
