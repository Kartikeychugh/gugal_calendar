import React from "react";

export interface ICalendarDimensionCellHeightContext {
  cellHeight: number;
  setCellHeight: (cellHeight: number) => void;
}

export const CalendarDimensionCellHeightContext =
  React.createContext<ICalendarDimensionCellHeightContext>(undefined!);
