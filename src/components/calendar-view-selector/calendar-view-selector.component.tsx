import { Button, Box, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { startOfToday } from "date-fns";

export const CalendarViewSelector = () => {
  const dispatch = useDispatch();
  const setView = (payload: {
    fromDay: number;
    numberOfDays: number;
    title: string;
  }) => {
    dispatch({ type: "SET_VIEW", payload });
  };
  const [state, setState] = useState({ open: false });
  const { title, pointer } = useSelector((state) => state.view);
  const ref = useRef(null);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}>
      <Button
        sx={{
          fontSize: "11px",
          height: "100%",
          fontWeight: 600,
          fontStyle: "normal",
          ml: 1,
          borderRadius: "10px",
        }}
        variant="contained"
        ref={ref}
        id="basic-button"
        aria-controls={state.open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={state.open ? "true" : undefined}
        onClick={() => {
          setState({ open: !state.open });
        }}>
        <CalendarTodayIcon sx={{ width: "20px", fill: "white", mr: 1 }} />
        {title}
      </Button>
      <Menu
        sx={{
          "& .MuiPaper-root": { mt: 1, borderRadius: "5px" },
        }}
        id="basic-menu"
        anchorEl={ref.current}
        open={state.open}
        onClose={() => {
          setState({ open: false });
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {[
          {
            Icon: CalendarViewDayIcon,
            view: {
              fromDay: pointer,
              numberOfDays: 1,
              title: "Day",
              change: 1,
              pointer,
            },
          },
          {
            Icon: CalendarViewWeekIcon,
            view: {
              fromDay: 0,
              numberOfDays: 7,
              change: 7,
              title: "Week",
              pointer,
            },
          },
          {
            Icon: ViewWeekIcon,
            view: {
              fromDay: 1,
              numberOfDays: 5,
              change: 7,
              title: "Work Week",
              pointer,
            },
          },
        ].map((viewDetails, i) => {
          const { Icon } = viewDetails;
          return (
            <MenuItem
              key={i}
              onClick={() => {
                setState({ open: false });
                setView(viewDetails.view);
              }}
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                fontStyle: "normal",
                color: "#0369a1",
              }}>
              <Icon sx={{ width: "20px", fill: "#1976d2", mr: 1 }} />

              {viewDetails.view.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
