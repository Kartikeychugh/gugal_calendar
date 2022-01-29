import { ICalendarDimensionsContext } from "../../..";
import { ICalendarEventItem } from "../../../../models";
import { ICalendarView } from "../../../providers/calendar-view/calendar-view.context";
import { CalendarSurfaceRendererResuable } from "../../@internal/calendar-surface-renderer/calendar-surface-renderer.reusable";

export const CalendarSurfaceReusable = (props: {
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
    <div style={{ width: "100%", height: "100%" }}>
      <CalendarSurfaceRendererResuable {...props} />
    </div>
  );
};
