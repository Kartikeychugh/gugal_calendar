import { Box, Button } from "@mui/material";
import { isSameDay, addDays, startOfToday, startOfWeek } from "date-fns";
import { useContext } from "react";
import { CalendarDimensionsContext } from "../../contexts";
import { useUpdateSelectedDate } from "../../hooks/use-set-window";
import { useUpdateView } from "../../hooks/use-update-view";
import { useView } from "../../hooks/use-view";
import { getWeekDetails } from "../../utils/get-view-details";

export const CalendarHeader = () => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  const { selectedDate, fromDay, numberOfDays } = useView();
  const start = startOfWeek(selectedDate);
  const updateView = useUpdateView();
  const setWindowAndView = useUpdateSelectedDate();

  const weekDetails = getWeekDetails(addDays(start, fromDay), numberOfDays);

  const today = startOfToday();

  return (
    <Box sx={{ width: "100%", height: "60px", display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: 700,
          padding: "4px",
          flexDirection: "column",
          minWidth: `${calendarDimensionsValue.timeGridWidth}px`,
        }}></Box>
      {weekDetails.week.map((date, i) => {
        return (
          <Button
            variant="text"
            sx={{
              height: "100%",
              padding: "4px 8px 4px 8px",
              flexDirection: "column",
              width: `calc(${100 / numberOfDays}%)`,
              backgroundColor: isSameDay(new Date(date), today)
                ? "#EFF6FF"
                : "white",
              boxShadow:
                i + 1 === numberOfDays
                  ? "inset 0px -1px 0px #e0e0e0"
                  : "inset -1px -1px 0px #e0e0e0",
            }}
            onClick={() => {
              updateView(0);
              setWindowAndView(date);
            }}
            key={i}>
            <Box
              sx={{
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "10px",
                lineHeight: "12px",
                color: "#71717a",
              }}>
              {new Date(date).toLocaleDateString("en-GB", { weekday: "short" })}
            </Box>
            <Box
              sx={{
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "32px",
                color: "#000000",
                display: "flex",
              }}>
              <Box> {new Date(date).getDate()}</Box>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
};
