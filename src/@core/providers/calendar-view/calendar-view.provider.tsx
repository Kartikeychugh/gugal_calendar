import {
  addDays,
  eachDayOfInterval,
  getDay,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { PropsWithChildren } from "react";
import { CalendarAvailableViewsProvider } from "../calendar-available-views";
import { CalendarViewManagerProvider } from "../calendar-view-manager";
import { CalendarViewContext } from "./calendar-view.context";

export const getViews = (minColumnWidth: number) => [
  {
    numberOfDays: 1,
    title: "Day",
    change: 1,
    viewId: 0,
    getViewStartDay: (selectedDate: number) =>
      selectedDate ? getDay(selectedDate) : 0,
    getViewDates: (selectedDate: number) =>
      eachDayOfInterval({
        start: selectedDate,
        end: selectedDate,
      }),
    breakpoint: 1 * minColumnWidth,
  },
  {
    numberOfDays: 5,
    change: 7,
    title: "Work Week",
    viewId: 1,
    getViewStartDay: () => 1,
    getViewDates: (selectedDate: number) =>
      eachDayOfInterval({
        start: addDays(startOfWeek(selectedDate), 1),
        end: addDays(startOfWeek(selectedDate), 5),
      }),
    breakpoint: 5 * minColumnWidth,
  },
  {
    numberOfDays: 7,
    change: 7,
    title: "Week",
    viewId: 2,
    breakpoint: 7 * minColumnWidth,
    getViewStartDay: () => 0,
    getViewDates: (selectedDate: number) =>
      eachDayOfInterval({
        start: startOfWeek(selectedDate),
        end: addDays(startOfWeek(selectedDate), 6),
      }),
  },
  {
    numberOfDays: 4,
    change: 4,
    title: "4 days",
    viewId: 3,
    breakpoint: 4 * minColumnWidth,
    getViewStartDay: () => startOfToday().getDay(),
    getViewDates: (selectedDate: number) =>
      eachDayOfInterval({
        start: selectedDate,
        end: addDays(selectedDate, 3),
      }),
  },
];

export const CalendarViewProvider = (
  props: PropsWithChildren<{
    minColumnWidth?: number;
    userViewId?: number;
    onViewChange?: (viewId: number) => void;
  }>
) => {
  const { minColumnWidth = 60, userViewId = 2, onViewChange } = props;
  return (
    <CalendarViewContext.Provider
      value={{ allViews: getViews(minColumnWidth), onViewChange }}
    >
      <CalendarAvailableViewsProvider>
        <CalendarViewManagerProvider userViewId={userViewId}>
          {props.children}
        </CalendarViewManagerProvider>
      </CalendarAvailableViewsProvider>
    </CalendarViewContext.Provider>
  );
};
