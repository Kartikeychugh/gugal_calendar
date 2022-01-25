import { Paper } from "@mui/material";
import { CalendarSurface } from "../../@core";

export const CalendarSurfaceContainer = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: "10px 10px 10px 10px",
        width: "100%",
        padding: `${16}px`,
      }}
    >
      <CalendarSurface />
    </Paper>
  );
};
