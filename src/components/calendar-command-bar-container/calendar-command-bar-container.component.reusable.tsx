import { Box } from "@mui/material";
import { CalendarCommandBarReusable } from "../../@core/components/@api/calender-command-bar/calendar-command-bar.component.reusable";
import { ICalendarView } from "../../@core/providers/calendar-view/calendar-view.context";

export const CalendarCommandBarContainerReusable = (props: {
  startDateOfView: number;
  endDateOfView: number;
  currentView: ICalendarView;
  getView: (viewId: number) => ICalendarView;
  availableViews: ICalendarView[];
  updateUserView: (newViewId: number) => void;
  slideView: (direction: number) => void;
  slideToToday: () => void;
}) => {
  const {
    startDateOfView,
    endDateOfView,
    currentView,
    getView,
    availableViews,
    updateUserView,
    slideView,
    slideToToday,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "30px",
        alignItems: "center",
        mb: 2,
      }}
    >
      <CalendarCommandBarReusable
        startDateOfView={startDateOfView}
        endDateOfView={endDateOfView}
        currentView={currentView}
        getView={getView}
        availableViews={availableViews}
        updateUserView={updateUserView}
        slideToToday={slideToToday}
        slideView={slideView}
      />
    </Box>
  );
};
