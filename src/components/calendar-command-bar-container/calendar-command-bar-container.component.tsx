import { Box } from "@mui/material";
import { CalendarCommandBar } from "../../@core";

export const CalendarCommandBarContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "60px",
        alignItems: "center",
      }}
    >
      <CalendarCommandBar />
    </Box>
  );
};
