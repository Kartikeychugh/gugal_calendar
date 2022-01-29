import { Paper } from "@mui/material";
import { ICalendarDimensionsContext } from "../../@core";
import { CalendarSurfaceReusable } from "../../@core/components/@api/calendar-surface/calendar-surface.reusable";
import { ICalendarView } from "../../@core/providers/calendar-view/calendar-view.context";
import { ICalendarEventItem } from "../../models";

export const CalendarSurfaceContainerReusable = (props: {
  events: ICalendarEventItem[];
  startDateOfView: number;
  endDateOfView: number;
  dimensions: ICalendarDimensionsContext;
  colors: CalendarColors | null;
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  currentView: ICalendarView;
  getView: (viewId: number) => ICalendarView;
  availableViews: ICalendarView[];
  updateUserView: (newViewId: number) => void;
  slideView: (direction: number) => void;
  slideToToday: () => void;
  setAvailableViews: (newAvailableViews: ICalendarView[]) => void;
  userViewId: number;
  updateResponsiveView: (newViewId: number | null) => void;
  allViews: ICalendarView[];
}) => {
  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: "10px 10px 10px 10px",
        width: "100%",
        padding: `${16}px`,
      }}
    >
      <CalendarSurfaceReusable {...props} />
    </Paper>
  );
};
