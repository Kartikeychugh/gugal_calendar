import { Box } from "@mui/material";
import { CalendarCommandBarReusable } from "../../@core/components/@api/calender-command-bar/calendar-command-bar.component.reusable";

export const CalendarCommandBarContainerReusable = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "30px",
        alignItems: "center",
        mb: 2,
      }}
    >
      <CalendarCommandBarReusable />
    </Box>
  );
};
