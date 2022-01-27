import { Box } from "@mui/material";
import {
  CalendarCommandViewSelector,
  CalendarCommandViewSlider,
} from "../../@internal";
import { useCalendarView } from "../../../hooks";

import { addDays } from "date-fns";

export const CalendarCommandBar = () => {
  const {
    currentView: { fromDay, numberOfDays },
    startOfWeekForSelectedDate,
  } = useCalendarView();

  const viewStart = addDays(startOfWeekForSelectedDate, fromDay);
  const viewEnd = addDays(
    startOfWeekForSelectedDate,
    fromDay + numberOfDays - 1
  );
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
