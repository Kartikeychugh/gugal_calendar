import { useContext } from "react";
import { CalendarDimensionCellHeightContext } from ".";

export const useCalendarDimensionCellHeightContext = () => {
  return useContext(CalendarDimensionCellHeightContext);
};
