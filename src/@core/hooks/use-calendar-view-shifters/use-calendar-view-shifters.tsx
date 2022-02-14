import { startOfToday, addDays } from "date-fns";
import { useCallback } from "react";
import { useCalendarViewManager } from "../..";
import { useCalendarDate } from "../../providers/calendar-date";

export const useCalendarDateShifterCallbacks = () => {
  const { selectedDate, onSelectedDateChange } = useCalendarDate();
  const { currentView } = useCalendarViewManager();

  const slideToToday = useCallback(() => {
    onSelectedDateChange(startOfToday().valueOf());
  }, [onSelectedDateChange]);

  const slideView = useCallback(
    (direction: number) => {
      onSelectedDateChange(
        addDays(selectedDate, direction * currentView.change).valueOf()
      );
    },
    [onSelectedDateChange, selectedDate, currentView.change]
  );
  return { slideToToday, slideView };
};
