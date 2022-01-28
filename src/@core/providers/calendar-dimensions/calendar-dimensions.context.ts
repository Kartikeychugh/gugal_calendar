import React from "react";

export interface ICalendarDimensionsContext {
  minCellHeight: number;
  timeGridWidth: number;
  minColumnWidth: number;
}

export const CalendarDimensionsContext =
  React.createContext<ICalendarDimensionsContext>({
    minCellHeight: 60,
    timeGridWidth: 50,
    minColumnWidth: 64,
  });

export const CalendarDimensionsProvider = CalendarDimensionsContext.Provider;
