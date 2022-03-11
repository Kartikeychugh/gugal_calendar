import { Button, Box, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { makeStyles } from "@mui/styles";
import { useCalendarAvailableViews } from "../../../providers/calendar-available-views";
import { useCalendarViewManager } from "../../../providers";

const useStyle = makeStyles({
  root: { display: "flex", alignItems: "center", height: "100%" },
  viewSelectorButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    // backgroundColor: "rgb(25, 118, 210, 0.07)",
    fontSize: "12px",
    // color: "#18181B",
    marginLeft: "2px",
    marginRight: "2px",
    minWidth: "100px",
    fontWeight: "700",
    "& .MuiSvgIcon-root": {
      // fill: "black",
      width: "14px",
    },
  },
  todayIcon: {
    width: "20px",
    // fill: "white",
    marginRight: "8px",
  },
  menu: {
    "& .MuiPaper-root": { marginTop: "8px", borderRadius: "5px" },
  },
  menuItem: {
    // color: "#18181B",
    fontSize: "13px",
    fontStyle: "normal",
    letterSpacing: "1px",
    "& .MuiSvgIcon-root": {
      // fill: "black",
      width: "14px",
      fontWeight: 500,
    },
    "&:hover": {
      // backgroundColor: "rgb(25, 118, 210, 0.07)",
    },
  },
});

export const CalendarCommandViewSelector = () => {
  const [state, setState] = useState({ open: false });
  const { currentView, updateUserView } = useCalendarViewManager();
  const { availableViews } = useCalendarAvailableViews();

  const ref = useRef(null);
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Button
        variant={"contained" as any}
        className={classes.viewSelectorButton}
        ref={ref}
        id="basic-button"
        aria-controls={state.open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={state.open ? "true" : undefined}
        onClick={() => {
          setState({ open: !state.open });
        }}
      >
        <CalendarTodayIcon className={classes.todayIcon} />
        {currentView.title}
      </Button>
      <Menu
        className={classes.menu}
        id="basic-menu"
        anchorEl={ref.current}
        open={state.open}
        onClose={() => {
          setState({ open: false });
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {availableViews.map(({ viewId, title }, i) => {
          return (
            <MenuItem
              selected={viewId === currentView.viewId}
              key={i}
              onClick={() => {
                setState({ open: false });
                updateUserView(viewId);
              }}
              className={classes.menuItem}
            >
              {title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
