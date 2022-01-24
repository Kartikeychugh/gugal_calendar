import { getDay } from "date-fns";
import startOfToday from "date-fns/startOfToday";
import React, { PropsWithChildren, useContext, useMemo, useState } from "react";
import { CalendarDimensionsContext } from "..";
import { useSelector } from "../../redux/hooks/use-selector";

export const views: {
  fromDay?: number;
  numberOfDays: number;
  title: string;
  change: number;
  viewId: number;
  breakpoint: number;
}[] = [
  {
    numberOfDays: 1,
    title: "Day",
    change: 1,
    viewId: 0,
    breakpoint: 0,
  },
  {
    fromDay: 1,
    numberOfDays: 5,
    change: 7,
    title: "Work Week",
    viewId: 1,
    breakpoint: 600,
  },
  {
    fromDay: 0,
    numberOfDays: 7,
    change: 7,
    title: "Week",
    viewId: 2,
    breakpoint: 900,
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
  currentViewId: number;
  selectedDate: number;
  allViews: ICalendarView[];
  availableViews: ICalendarView[];
  currentView: ICalendarView;
  getView: (viewId: number) => ICalendarView;
  setCalendarSelectedDate: (newSelectedDate: number) => void;
  setBreakAt: (breakAt: number | null) => void;
  // setCalendarView: (newViewID: number) => void;
}

export const CalendarViewContext = React.createContext<ICalendarViewContext>(
  undefined!
);

export const CalendarViewProvider = (props: PropsWithChildren<{}>) => {
  const [selectedDate, setSelectedDate] = useState<number>(
    startOfToday().valueOf()
  );
  const [breakAt, setBreakAt] = useState<number | null>(null);

  const {
    userView: { viewId: userViewId },
    responsiveView: { viewId: responsiveViewId },
  } = useSelector((state) => state.view);

  const dimensions = useContext(CalendarDimensionsContext);
  const allViews: ICalendarView[] = useMemo(() => {
    const _allViews = views.map((view) => {
      if (view.viewId === 0) {
        view.fromDay = getDay(selectedDate);
      }
      return view as ICalendarView;
    });

    _allViews.forEach((view) => {
      view.breakpoint =
        view.numberOfDays * dimensions.columnMinWidth +
        dimensions.timeGridWidth +
        2 * dimensions.surfacePadding +
        1;
    });

    return _allViews;
  }, [
    dimensions.timeGridWidth,
    selectedDate,
    dimensions.columnMinWidth,
    dimensions.surfacePadding,
  ]);

  const currentViewId = useMemo(() => {
    return responsiveViewId !== null ? responsiveViewId : userViewId;
  }, [responsiveViewId, userViewId]);

  const currentView = useMemo(() => {
    return allViews[currentViewId];
  }, [allViews, currentViewId]);

  const availableViews = useMemo(() => {
    if (breakAt === null) {
      return allViews;
    }

    return allViews.filter((view) => view.breakpoint < breakAt);
  }, [allViews, breakAt]);

  const getView = (viewId: number) => {
    return allViews[viewId];
  };

  const setCalendarSelectedDate = (newSelectedDate: number) => {
    setSelectedDate(newSelectedDate);
  };

  return (
    <CalendarViewContext.Provider
      value={{
        getView,
        setCalendarSelectedDate,
        selectedDate,
        allViews: allViews,
        currentViewId,
        currentView,
        setBreakAt,
        availableViews,
      }}>
      {currentView ? props.children : null}
    </CalendarViewContext.Provider>
  );
};
