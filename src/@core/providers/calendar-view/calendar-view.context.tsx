import { addDays, getDay, startOfToday, startOfWeek } from "date-fns";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

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
  minColumnWidth: number;
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

export const CalendarViewContext = React.createContext<ICalendarViewContext>(
  undefined!
);

interface IState {
  userViewId: number;
  responsiveViewId: number | null;
  minColumnWidth: number;
}

export const CalendarViewProvider = (
  props: PropsWithChildren<{
    userViewId: number;
    selectedDate: number;
    setSelectedDate: (newDate: number) => void;
    minColumnWidth: number;
  }>
) => {
  const { userViewId, selectedDate, setSelectedDate, minColumnWidth } = props;

  const [state, setState] = useState<IState>({
    userViewId,
    responsiveViewId: null,
    minColumnWidth: minColumnWidth,
  });

  const allViews: ICalendarView[] = useMemo(() => {
    const _allViews = views.map((view) => {
      const _view = { ...view };
      if (_view.viewId === 0) {
        _view.fromDay = getDay(selectedDate);
      }
      return _view as ICalendarView;
    });

    _allViews.forEach((view) => {
      view.breakpoint = view.numberOfDays * state.minColumnWidth + 2;
    });

    return _allViews;
  }, [state.minColumnWidth, selectedDate]);

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

  const currentView = useMemo(
    () => allViews[currentViewId],
    [allViews, currentViewId]
  );
  const getView = useCallback(
    (viewId: number) => {
      return allViews[viewId];
    },
    [allViews]
  );

  const updateUserView = useCallback(
    (newViewId: number) => {
      setState({ ...state, userViewId: newViewId });
    },
    [state, setState]
  );

  const updateResponsiveView = useCallback(
    (newViewId: number | null) => {
      setState({ ...state, responsiveViewId: newViewId });
    },
    [state, setState]
  );

  const slideToToday = useCallback(() => {
    setSelectedDate(startOfToday().valueOf());
  }, [setSelectedDate]);

  const slideView = useCallback(
    (direction: number) => {
      setSelectedDate(
        addDays(selectedDate, direction * currentView.change).valueOf()
      );
    },
    [setSelectedDate, selectedDate, currentView.change]
  );

  return (
    <CalendarViewContext.Provider
      value={{
        startDateOfView,
        endDateOfView,
        minColumnWidth,
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
    </CalendarViewContext.Provider>
  );
};
