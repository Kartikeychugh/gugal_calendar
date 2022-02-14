import { addDays, startOfToday } from "date-fns";
import { useCalendarViewManager } from "../../providers";
import { useCalendarDate } from "../../providers/calendar-date";

export const useSlideView = () => {
  const {
    currentView: { change },
  } = useCalendarViewManager();
  const { selectedDate, onSelectedDateChange } = useCalendarDate();

  return (direction: number) => {
    onSelectedDateChange(addDays(selectedDate, direction * change).valueOf());
  };
};

export const useSlideToToday = () => {
  const { onSelectedDateChange } = useCalendarDate();

  return () => {
    onSelectedDateChange(startOfToday().valueOf());
  };
};
