import React from "react";
import { ICalendarEventItem } from "../../models";

export interface ICalendarEventDetailsContext {
  events: ICalendarEventItem[];
  colors: CalendarColors;
  defaultColorId: number;
}

export const CalendarEventDetailsContext =
  React.createContext<ICalendarEventDetailsContext>(undefined!);
