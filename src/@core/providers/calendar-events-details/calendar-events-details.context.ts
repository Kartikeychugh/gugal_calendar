import React from "react";
import { ICalendarEvent } from "../../models";

export interface ICalendarEventDetailsContext {
  events: ICalendarEvent[];
  colors: CalendarColors;
  defaultColorId: number;
}

export const CalendarEventDetailsContext =
  React.createContext<ICalendarEventDetailsContext>(undefined!);
