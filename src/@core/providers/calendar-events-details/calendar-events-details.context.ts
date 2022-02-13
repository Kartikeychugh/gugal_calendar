import React from "react";
import { ICalendarEvent } from "../../models";

export interface ICalendarEventDetailsContext {
  events: ICalendarEvent[];
}

export const CalendarEventDetailsContext =
  React.createContext<ICalendarEventDetailsContext>(undefined!);
