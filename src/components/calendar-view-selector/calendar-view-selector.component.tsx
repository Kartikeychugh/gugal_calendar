import { Button, Box } from "@mui/material";
import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import { getWorkWeek } from "../../utils/get-current-week-dates";
import "./calendar-view-selector.css";

export const CalendarViewSelector = () => {
  const dispatch = useDispatch();
  const setView = (dates: string[]) => {
    dispatch({ type: "SET_VIEW", payload: { dates } });
  };
  const { dates } = useSelector((state) => state.view);

  return (
    <Box
      sx={{
        display: "flex",
        "& .MuiButton-root": {
          fontSize: "11px",
          height: "fit-content",
          padding: "7px",
          fontWeight: 600,
          fontStyle: "normal",
          borderRadius: "14px",
          mr: 2,
        },
      }}>
      {[
        { dates: getWorkWeek(5), title: "Work Week" },
        { dates: getWorkWeek(7), title: "Week" },
      ].map((view, key) => (
        <Button
          {...(dates.length === view.dates.length
            ? { variant: "contained" }
            : { variant: "outlined" })}
          key={key}
          onClick={() => setView(view.dates)}
          // sx={{
          //   backgroundColor: "#1976d2",
          // }}
          /* className={`view-pill ${
            dates.length === view.dates.length ? `selected-view-pill ` : ``
          }`} */
        >
          {view.title}
        </Button>
      ))}
    </Box>
  );
};
