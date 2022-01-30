import { Box } from "@mui/material";

import { CalendarCommandViewSliderReusable } from "../../@internal/calendar-command-view-slider/calendar-command-view-slider.reusable";
import { CalendarCommandViewSelectorReusable } from "../../@internal/calendar-command-view-selector/calendar-command-view-selector.reusable";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";
import { useContext } from "react";

export const CalendarCommandBarReusable = () => {
  const { startDateOfView, endDateOfView } = useContext(
    CalendarViewContextReusable
  );

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
        <CalendarCommandViewSliderReusable />
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

      <CalendarCommandViewSelectorReusable />
    </Box>
  );
};
