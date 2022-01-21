import { Box, Button } from "@mui/material";
import { isSameDay, addDays, startOfToday } from "date-fns";
import { useUpdateView } from "../../hooks/use-update-view";
import { useSelector } from "../../redux/hooks/use-selector";
import { getViewDetails } from "../../utils/get-view-details";

export const CalendarHeader = (props: { timeGridWidth: number }) => {
  const { start } = useSelector((state) => state.window);
  const { fromDay, numberOfDays } = useSelector((state) => state.view);
  const updateView = useUpdateView();
  const details = getViewDetails(addDays(start, fromDay), numberOfDays);

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
          minWidth: `${props.timeGridWidth}px`,
        }}></Box>
      {details.week.map((date, i) => {
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
            onClick={() => updateView(date.getDay(), 0)}
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
