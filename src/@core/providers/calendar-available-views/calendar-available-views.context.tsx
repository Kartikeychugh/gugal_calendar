import { createContext } from "react";
import { ICalendarView } from "../calendar-view/calendar-view.context";

export interface ICalendarAvailableViews {
  availableViews: ICalendarView[];
  updateViewsFromGridWidth: (width: number) => void;
}

export const CalendarAvailableViewsContext =
  createContext<ICalendarAvailableViews>(undefined!);
