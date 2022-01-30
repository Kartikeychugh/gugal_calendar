import React from "react";
import { ICalendarEventItem } from "../../models";

export interface ICalendarEventDetailsContext {
  events: ICalendarEventItem[];
  colors: CalendarColors;
}

export const CalendarEventDetailsContext =
  React.createContext<ICalendarEventDetailsContext>(undefined!);
