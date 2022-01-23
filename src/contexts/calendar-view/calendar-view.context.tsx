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
  currentView: ICalendarView;
  getView: (viewId: number) => ICalendarView;
  setCalendarSelectedDate: (newSelectedDate: number) => void;
  // setCalendarView: (newViewID: number) => void;
}

export const CalendarViewContext = React.createContext<ICalendarViewContext>(
  undefined!
);

export const CalendarViewProvider = (props: PropsWithChildren<{}>) => {
  const [selectedDate, setSelectedDate] = useState<number>(
    startOfToday().valueOf()
  );
  const {
    userView: { viewId: userViewId },
    responsiveView: { viewId: responsiveViewId },
  } = useSelector((state) => state.view);
  const dimensions = useContext(CalendarDimensionsContext);

  let allViews: ICalendarView[] = useMemo(() => {
    const x = views.map((view) => {
      if (view.viewId === 0) {
        view.fromDay = getDay(selectedDate);
      }
      return view as ICalendarView;
    });

    x.forEach((view) => {
      view.breakpoint = view.numberOfDays * 100 + dimensions.timeGridWidth + 32;
    });

    return x;
  }, [dimensions.timeGridWidth, selectedDate]);

  const currentViewId =
    responsiveViewId !== null ? responsiveViewId : userViewId;
  const currentView = allViews[currentViewId];

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
      }}>
      {currentView ? props.children : null}
    </CalendarViewContext.Provider>
  );
};
