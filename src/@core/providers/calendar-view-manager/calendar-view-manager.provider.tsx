import { PropsWithChildren, useState, useCallback, useMemo } from "react";
import { CalendarViewManagerContext } from "./calendar-view-manager.context";
import { useCalendarView } from "../calendar-view";
import { ICalendarView } from "../calendar-view/calendar-view.context";
import { useCalendarDate } from "../calendar-date";
import { useCalendarAvailableViews } from "../calendar-available-views";
import React from "react";

interface IState {
  userViewId: number;
  responsiveViewId: number | null;
}

export const CalendarViewManagerProvider = React.memo(
  (
    props: PropsWithChildren<{
      userViewId?: number;
    }>
  ) => {
    const { userViewId = 2 } = props;

    const [state, setState] = useState<IState>({
      userViewId,
      responsiveViewId: null,
    });

    const { updateUserView, userView } = useUserView(state, setState);
    const { updateResponsiveView, responsiveView } = useResponsiveView(
      state,
      setState
    );
    const currentView = useCurrentView(state);
    const viewDates = useCurrentViewDates(currentView);

    return (
      <CalendarViewManagerContext.Provider
        value={{
          userView,
          responsiveView,
          currentView,
          updateUserView,
          updateResponsiveView,
          viewDates,
        }}
      >
        {true ? props.children : null}
      </CalendarViewManagerContext.Provider>
    );
  }
);

const useCurrentViewDates = (currentView: ICalendarView) => {
  const { selectedDate } = useCalendarDate();

  return useMemo(() => {
    return currentView.getViewDates(selectedDate);
  }, [currentView, selectedDate]);
};

const useCurrentView = (state: IState) => {
  const { availableViews } = useCalendarAvailableViews();

  return useMemo(() => {
    const currentViewId =
      state.responsiveViewId !== null
        ? state.responsiveViewId
        : state.userViewId;

    if (availableViews[currentViewId]) {
      return availableViews[currentViewId];
    }

    throw new Error("Something went wrong");
  }, [availableViews, state.responsiveViewId, state.userViewId]);
};

const useResponsiveView = (
  state: IState,
  setState: React.Dispatch<React.SetStateAction<IState>>
) => {
  const { allViews } = useCalendarView();

  const responsiveView = useMemo(() => {
    return state.responsiveViewId ? allViews[state.responsiveViewId] : null;
  }, [allViews, state.responsiveViewId]);

  const updateResponsiveView = useCallback(
    (newViewId: number | null) => {
      setState({ ...state, responsiveViewId: newViewId });
    },
    [state, setState]
  );
  return { updateResponsiveView, responsiveView };
};

const useUserView = (
  state: IState,
  setState: React.Dispatch<React.SetStateAction<IState>>
) => {
  const { allViews, onViewChange } = useCalendarView();

  const userView = useMemo(() => {
    return allViews[state.userViewId];
  }, [allViews, state.userViewId]);

  const updateUserView = useCallback(
    (newViewId: number) => {
      if (onViewChange) onViewChange(newViewId);
      setState({ ...state, userViewId: newViewId });
    },
    [state, setState, onViewChange]
  );
  return { updateUserView, userView };
};
