import React from "react";

export interface ICalendarDimensionsContext {
  minCellHeight: number;
  timeGridWidth: number;
  columnMinWidth: number;
}

export const CalendarDimensionsContext =
  React.createContext<ICalendarDimensionsContext>({
    minCellHeight: 60,
    timeGridWidth: 50,
    columnMinWidth: 64,
  });

export const CalendarDimensionsProvider = CalendarDimensionsContext.Provider;
