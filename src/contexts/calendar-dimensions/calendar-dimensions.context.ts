import React from "react";

export interface ICalendarDimensionsContext {
  cellSize: number;
  timeGridWidth: number;
}

export const CalendarDimensionsContext =
  React.createContext<ICalendarDimensionsContext>({
    cellSize: 60,
    timeGridWidth: 50,
  });

export const CalendarDimensionsProvider = CalendarDimensionsContext.Provider;
