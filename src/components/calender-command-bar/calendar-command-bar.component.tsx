import { Box } from "@mui/material";
import { CalendarViewSelector } from "../calendar-view-selector/calendar-view-selector.component";
import { CalendarViewContext } from "../../contexts/calendar-view/calendar-view.context";

import { addDays, startOfWeek } from "date-fns";
import { CalendarViewSlider } from "../calendar-slider/calendar-slider";
import { useContext } from "react";

export const CalendarCommandBar = () => {
  const { currentView, selectedDate } = useContext(CalendarViewContext);
  const { fromDay, numberOfDays } = currentView;
  const start = startOfWeek(selectedDate);

  const spansAcrossMonth =
    addDays(new Date(start), fromDay).getMonth() !==
    addDays(new Date(start), fromDay + numberOfDays - 1).getMonth();

  return (
    <Box
      sx={{
        display: "flex",
        height: "30px",
        alignItems: "center",
        mb: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          color: "black",
          letterSpacing: "1px",
        }}>
        <CalendarViewSlider />
        <Box
          sx={{
            display: "flex",
            fontWeight: 600,
            ml: "15px",
            fontSize: "12px",
          }}>
          <Box sx={{ mr: 1 }}>
            {addDays(start, fromDay).toLocaleString("default", {
              month: "long",
            })}
          </Box>
          {spansAcrossMonth ? "-" : null}
          {spansAcrossMonth ? (
            <Box sx={{ ml: 1 }}>
              {addDays(start, fromDay + numberOfDays - 1).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )}
            </Box>
          ) : null}
        </Box>
      </Box>

      <CalendarViewSelector />
    </Box>
  );
};
