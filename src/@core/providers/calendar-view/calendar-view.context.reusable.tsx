import { addDays, getDay, startOfToday, startOfWeek } from "date-fns";
import React, { PropsWithChildren, useMemo, useState } from "react";

export const views: {
  fromDay?: number;
  numberOfDays: number;
  title: string;
  change: number;
  viewId: number;
}[] = [
  {
    numberOfDays: 1,
    title: "Day",
    change: 1,
    viewId: 0,
  },
  {
    fromDay: 1,
    numberOfDays: 5,
    change: 7,
    title: "Work Week",
    viewId: 1,
  },
  {
    fromDay: 0,
    numberOfDays: 7,
    change: 7,
    title: "Week",
    viewId: 2,
  },
];

export interface ICalendarView {
  fromDay: number;
  numberOfDays: number;
  title: string;
  change: number;
  viewId: number;
  breakpoint: number;
}

export interface ICalendarViewContext {
  startDateOfView: number;
  endDateOfView: number;
  dimensions: {
    minCellHeight: number;
    timeGridWidth: number;
    minColumnWidth: number;
  };
  colors: CalendarColors | null;
  selectedDate: number;
  currentView: ICalendarView;
  setSelectedDate: (newDate: number) => void;
  getView: (viewId: number) => ICalendarView;
  updateUserView: (newViewId: number) => void;
  availableViews: ICalendarView[];
  slideToToday: () => void;
  slideView: (direction: number) => void;
  updateResponsiveView: (newViewId: number | null) => void;
  userViewId: number;
  allViews: ICalendarView[];
  setAvailableViews: (newAvailableViews: ICalendarView[]) => void;
}

export const CalendarViewContextReusable =
  React.createContext<ICalendarViewContext>(undefined!);

interface IState {
  userViewId: number;
  responsiveViewId: number | null;
  dimensions: {
    minCellHeight: number;
    timeGridWidth: number;
    minColumnWidth: number;
  };
}

export const CalendarViewProviderReusable = (
  props: PropsWithChildren<{
    userViewId: number;
    selectedDate: number;
    setSelectedDate: (newDate: number) => void;
  }>
) => {
  const { userViewId, selectedDate, setSelectedDate } = props;

  const [state, setState] = useState<IState>({
    userViewId,
    responsiveViewId: null,
    dimensions: { minColumnWidth: 100, timeGridWidth: 50, minCellHeight: 60 },
  });

  const allViews: ICalendarView[] = useMemo(() => {
    const _allViews = views.map((view) => {
      if (view.viewId === 0) {
        view.fromDay = getDay(selectedDate);
      }
      return view as ICalendarView;
    });

    _allViews.forEach((view) => {
      view.breakpoint = view.numberOfDays * state.dimensions.minColumnWidth;
    });

    return _allViews;
  }, [state.dimensions.minColumnWidth, selectedDate]);

  const [availableViews, setAvailableViews] =
    useState<ICalendarView[]>(allViews);

  const currentViewId = useMemo(() => {
    return state.responsiveViewId !== null
      ? state.responsiveViewId
      : state.userViewId;
  }, [state.responsiveViewId, state.userViewId]);

  const startDateOfView = addDays(
    startOfWeek(selectedDate),
    allViews[currentViewId].fromDay
  ).valueOf();
  const endDateOfView = addDays(
    startDateOfView,
    allViews[currentViewId].numberOfDays - 1
  ).valueOf();

  const colors = null;

  const currentView = allViews[currentViewId];
  const getView = (viewId: number) => {
    return allViews[viewId];
  };
  const updateUserView = (newViewId: number) => {
    setState({ ...state, userViewId: newViewId });
  };

  const updateResponsiveView = (newViewId: number | null) => {
    setState({ ...state, responsiveViewId: newViewId });
  };
  const slideToToday = () => {
    setSelectedDate(startOfToday().valueOf());
  };
  const slideView = (direction: number) => {
    setSelectedDate(
      addDays(selectedDate, direction * currentView.change).valueOf()
    );
  };

  return (
    <CalendarViewContextReusable.Provider
      value={{
        startDateOfView,
        endDateOfView,
        colors,
        dimensions: state.dimensions,
        selectedDate: selectedDate,
        setSelectedDate,
        currentView,
        availableViews,
        getView,
        updateUserView,
        slideToToday,
        slideView,
        updateResponsiveView,
        userViewId: state.userViewId,
        allViews,
        setAvailableViews,
      }}
    >
      {true ? props.children : null}
    </CalendarViewContextReusable.Provider>
  );
};
