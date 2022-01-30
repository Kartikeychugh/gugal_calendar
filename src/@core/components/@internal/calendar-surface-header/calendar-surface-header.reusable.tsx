import { Box, Button } from "@mui/material";
import { eachDayOfInterval, isSameDay, startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";

export const CalendarSurfaceHeaderReusable = (props: {
  onHeaderClick: (date: number) => void;
}) => {
  const { onHeaderClick } = props;
  const { startDateOfView, endDateOfView, dimensions } = useContext(
    CalendarViewContextReusable
  );
  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });
  const numberOfDays = currentDates.length;
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
          minWidth: `${dimensions.timeGridWidth}px`,
        }}
      ></Box>
      {currentDates.map((date, i) => {
        return (
          <Button
            variant="text"
            sx={{
              minWidth: `${dimensions.columnWidth}px`,
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
            onClick={() => onHeaderClick(date.valueOf())}
            key={i}
          >
            <Box
              sx={{
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "10px",
                lineHeight: "12px",
                color: "#71717a",
              }}
            >
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
              }}
            >
              <Box> {new Date(date).getDate()}</Box>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
};
