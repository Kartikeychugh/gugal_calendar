import { Box } from "@mui/material";
import { ICalendarDimensionsContext } from "../../..";
import { CalendarCommandBarContainerReusable } from "../../../../components/calendar-command-bar-container/calendar-command-bar-container.component.reusable";
import { ICalendarEventItem } from "../../../../models";
import { ICalendarView } from "../../../providers/calendar-view/calendar-view.context";
import { CalendarSurfaceScrollableGridReusable } from "../calendar-surface-grid/calendar-surface-grid.component.reusable";
import { CalendarSurfaceHeaderReusable } from "../calendar-surface-header/calendar-surface-header.reusable";

export const CalendarSurfaceRendererResuable = (props: {
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
  const {
    startDateOfView,
    endDateOfView,
    dimensions,
    events,
    onHeaderClick,
    onCellClick,
    currentView,
    getView,
    availableViews,
    updateUserView,
    slideView,
    slideToToday,
    updateResponsiveView,
    allViews,
    userViewId,
    setAvailableViews,
  } = props;

  return (
    <>
      <CalendarCommandBarContainerReusable
        startDateOfView={startDateOfView}
        endDateOfView={endDateOfView}
        currentView={currentView}
        getView={getView}
        availableViews={availableViews}
        updateUserView={updateUserView}
        slideView={slideView}
        slideToToday={slideToToday}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 46px)",
        }}
      >
        <CalendarSurfaceHeaderReusable
          startDateOfView={startDateOfView}
          endDateOfView={endDateOfView}
          onHeaderClick={onHeaderClick}
          dimensions={dimensions}
        />
        <CalendarSurfaceScrollableGridReusable
          colors={props.colors}
          startDateOfView={startDateOfView}
          endDateOfView={endDateOfView}
          dimensions={dimensions}
          events={events}
          onCellClick={onCellClick}
          getView={getView}
          updateResponsiveView={updateResponsiveView}
          allViews={allViews}
          userViewId={userViewId}
          setAvailableViews={setAvailableViews}
        />
      </Box>
    </>
  );
};

// (date, hour) => {
//     createClientEvent(addHours(date, hour), addHours(date, hour + 1));
//   };
