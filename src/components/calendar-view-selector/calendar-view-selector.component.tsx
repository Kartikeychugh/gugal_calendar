import { Button, Box, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "../../redux/hooks/use-selector";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useUpdateView } from "../../hooks/use-update-view";
import { getView } from "../../utils/get-view-details";

export const CalendarViewSelector = () => {
  const updateView = useUpdateView();

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          backgroundColor: "rgb(25, 118, 210, 0.07)",
          fontSize: "12px",
          color: "#18181B",
          ml: "2px",
          mr: "2px",
          minWidth: "120px",
          fontWeight: "700",
          "& .MuiSvgIcon-root": {
            fill: "black",
            width: "14px",
          },
        }}
        // variant="contained"
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
            viewId: 0,
          },
          {
            Icon: CalendarViewWeekIcon,
            viewId: 1,
          },
          {
            Icon: ViewWeekIcon,
            viewId: 2,
          },
        ].map((viewDetails, i) => {
          const { Icon, viewId } = viewDetails;
          const view = getView(viewId, pointer);

          return (
            <MenuItem
              key={i}
              onClick={() => {
                setState({ open: false });
                updateView(pointer, viewDetails.viewId);
              }}
              sx={{
                color: "#18181B",
                fontSize: "13px",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "1px",
                "& .MuiSvgIcon-root": {
                  fill: "black",
                  width: "14px",
                  fontWeight: 500,
                },
                "&:hover": {
                  backgroundColor: "rgb(25, 118, 210, 0.07)",
                },
              }}>
              <Icon sx={{ width: "20px", fill: "#18181B", mr: 1 }} />

              {view.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
