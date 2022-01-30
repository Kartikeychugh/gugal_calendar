import { Box } from "@mui/material";

import { useContext } from "react";
import {
  CalendarCommandViewSlider,
  CalendarCommandViewSelector,
} from "../../@internal";
import { CalendarViewContext } from "../../../providers";

export const CalendarCommandBar = () => {
  const { startDateOfView, endDateOfView } = useContext(CalendarViewContext);

  const viewStart = new Date(startDateOfView);
  const viewEnd = new Date(endDateOfView);
  const viewSpansAcrossMonth = viewStart.getMonth() !== viewEnd.getMonth();

  return (
    <Box
      sx={{
        display: "flex",
        height: "30px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          color: "black",
          letterSpacing: "1px",
        }}
      >
        <CalendarCommandViewSlider />
        <Box
          sx={{
            display: "flex",
            fontWeight: 600,
            ml: "15px",
            fontSize: "12px",
          }}
        >
          <Box sx={{ mr: 1 }}>
            {viewStart.toLocaleString("default", {
              month: "long",
            })}
          </Box>
          {viewSpansAcrossMonth ? "-" : null}
          {viewSpansAcrossMonth ? (
            <Box sx={{ ml: 1 }}>
              {viewEnd.toLocaleString("default", {
                month: "long",
              })}
            </Box>
          ) : null}
        </Box>
      </Box>

      <CalendarCommandViewSelector />
    </Box>
  );
};
