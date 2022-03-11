import { createContext } from "react";

export interface ICalendarView {
  numberOfDays: number;
  title: string;
  change: number;
  viewId: number;
  breakpoint: number;
  getViewDates: (selectedDate: number) => Date[];
  getViewStartDay: (selectedDate: number) => number;
}

export const CalendarViewContext = createContext<{
  allViews: ICalendarView[];
  onViewChange?: (viewId: number) => void;
}>({ allViews: [] });
