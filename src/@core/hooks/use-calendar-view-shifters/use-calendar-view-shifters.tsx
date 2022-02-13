import { startOfToday, addDays } from "date-fns";
import { useCallback } from "react";
import { useCalendarViewManager } from "../..";
import { useCalendarDate } from "../../providers/calendar-date";

export const useCalendarDateShifterCallbacks = () => {
  const { selectedDate, setSelectedDate } = useCalendarDate();
  const { currentView } = useCalendarViewManager();

  const slideToToday = useCallback(() => {
    setSelectedDate(startOfToday().valueOf());
  }, [setSelectedDate]);

  const slideView = useCallback(
    (direction: number) => {
      setSelectedDate(
        addDays(selectedDate, direction * currentView.change).valueOf()
      );
    },
    [setSelectedDate, selectedDate, currentView.change]
  );
  return { slideToToday, slideView };
};
