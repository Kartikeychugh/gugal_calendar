import { Box, Button } from "@mui/material";
import { addDays } from "date-fns/esm";
import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import {
  getToday,
  isSameDate,
  isWeekEnd,
} from "../../utils/get-current-week-dates";
import { getViewDetails } from "../../utils/get-view-details";
import "./calendar-header.css";

export const CalendarHeader = () => {
  const { start } = useSelector((state) => state.window);
  const { fromDay, numberOfDays } = useSelector((state) => state.view);

  const details = getViewDetails(addDays(start, fromDay), numberOfDays);

  const today = getToday();
  const dispatch = useDispatch();
  const setView = (payload: { fromDay: number; numberOfDays: number }) => {
    dispatch({
      type: "SET_VIEW",
      payload: { ...payload, change: 1, title: "Day" },
    });
  };

  return (
    <Box className="header-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: 700,
          padding: "4px",
          flexDirection: "column",
        }}
        className="header-gutter"></Box>
      {details.week.map((date, i) => {
        return (
          <Button
            variant="text"
            sx={{
              flexDirection: "column",
              width: `calc(${100 / numberOfDays}%)`,
              backgroundColor: isSameDate(new Date(date), today)
                ? "#EFF6FF"
                : isWeekEnd(new Date(date))
                ? "#f5f5f5"
                : "white",
              boxShadow:
                i + 1 === numberOfDays
                  ? "inset 0px -1px 0px #e0e0e0"
                  : "inset -1px -1px 0px #e0e0e0",
            }}
            onClick={() => setView({ fromDay: date.getDay(), numberOfDays: 1 })}
            key={i}
            className="header-cell">
            <div className="header-cell-first-line">
              {new Date(date).toLocaleDateString("en-GB", { weekday: "short" })}
            </div>
            <div className="header-cell-second-line">
              <div> {new Date(date).getDate()}</div>
            </div>
          </Button>
        );
      })}
    </Box>
  );
};
