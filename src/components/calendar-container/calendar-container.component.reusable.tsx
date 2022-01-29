import { Box } from "@mui/material";

import { CalendarSurfaceContainerReusable } from "../calendar-surface-container/calendar-surface-container.component.reusable";
import { ICalendarEventItem } from "../../models";
import { CalendarDatePickerContainerReusable } from "../calendar-date-picker-container/calendar-date-picker-container.component.reusable";
import { useContext } from "react";
import {
  CalendarViewContextReusable,
  CalendarViewProviderReusable,
} from "../../@core/providers/calendar-view/calendar-view.context.reusable";
import { startOfToday } from "date-fns";

export const CalendarContainerReusable = (props: {
  events: ICalendarEventItem[];
  userViewId: number;
  selectedDate: number;
  onCellClick: (date: Date, hour: number) => void;
  setSelectedDate: (newDate: number) => void;
}) => {
  const {
    userViewId = 1,
    selectedDate = startOfToday().valueOf(),
    onCellClick,
    setSelectedDate,
    events,
  } = props;
  return (
    <CalendarViewProviderReusable
      userViewId={userViewId}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    >
      <CalendarContainerReusableInternal
        onCellClick={onCellClick}
        events={events}
      />
    </CalendarViewProviderReusable>
  );
};

const CalendarContainerReusableInternal = (props: {
  events: ICalendarEventItem[];
  onCellClick: (date: Date, hour: number) => void;
}) => {
  const {
    currentView,
    startDateOfView,
    endDateOfView,
    dimensions,
    colors,
    selectedDate,
    setSelectedDate,
    getView,
    availableViews,
    updateUserView,
    slideToToday,
    slideView,
    userViewId,
    updateResponsiveView,
    allViews,
    setAvailableViews,
  } = useContext(CalendarViewContextReusable);

  const onHeaderClick = (date: number) => {
    console.log({ date });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", height: "calc(100%)" }}>
        <CalendarDatePickerContainerReusable
          selectedDate={selectedDate}
          setCalendarSelectedDate={setSelectedDate}
        />
        <CalendarSurfaceContainerReusable
          startDateOfView={startDateOfView}
          endDateOfView={endDateOfView}
          events={props.events}
          onHeaderClick={onHeaderClick}
          onCellClick={props.onCellClick}
          dimensions={dimensions}
          colors={colors}
          currentView={currentView}
          getView={getView}
          availableViews={availableViews}
          updateUserView={updateUserView}
          slideToToday={slideToToday}
          slideView={slideView}
          userViewId={userViewId}
          updateResponsiveView={updateResponsiveView}
          allViews={allViews}
          setAvailableViews={setAvailableViews}
        />
      </Box>
    </Box>
  );
};
