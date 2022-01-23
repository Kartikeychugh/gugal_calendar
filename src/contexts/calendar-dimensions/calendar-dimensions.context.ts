import React from "react";

export interface ICalendarDimensionsContext {
  cellHeight: number;
  timeGridWidth: number;
  columnMinWidth: number;
  surfacePadding: number;
}

export const CalendarDimensionsContext =
  React.createContext<ICalendarDimensionsContext>({
    cellHeight: 60,
    timeGridWidth: 50,
    columnMinWidth: 64,
    surfacePadding: 16,
  });

export const CalendarDimensionsProvider = CalendarDimensionsContext.Provider;
