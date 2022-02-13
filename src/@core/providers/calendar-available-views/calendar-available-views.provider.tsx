import { PropsWithChildren, useCallback, useState } from "react";
import { useCalendarView } from "../calendar-view";
import { ICalendarView } from "../calendar-view/calendar-view.context";
import { CalendarAvailableViewsContext } from "./calendar-available-views.context";

export const CalendarAvailableViewsProvider = (
  props: PropsWithChildren<{}>
) => {
  const { allViews } = useCalendarView();
  const [availableViews, setAvailableViews] =
    useState<ICalendarView[]>(allViews);

  const updateViewsFromGridWidth = useCallback(
    (width: number) => {
      const newAvailableViews = allViews.filter(
        (view) => view.breakpoint <= width
      );
      setAvailableViews(newAvailableViews);
    },
    [setAvailableViews, allViews]
  );

  return (
    <CalendarAvailableViewsContext.Provider
      value={{ availableViews, updateViewsFromGridWidth }}
    >
      {props.children}
    </CalendarAvailableViewsContext.Provider>
  );
};
