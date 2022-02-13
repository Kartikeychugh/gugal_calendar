import React from "react";
import { ICalendarView } from "../calendar-view/calendar-view.context";

export interface ICalendarViewContext {
  currentView: ICalendarView;
  viewDates: Date[];
  userView: ICalendarView;
  responsiveView: ICalendarView | null;
  updateUserView: (newViewId: number) => void;
  updateResponsiveView: (newViewId: number | null) => void;
}

export const CalendarViewManagerContext =
  React.createContext<ICalendarViewContext>(undefined!);
