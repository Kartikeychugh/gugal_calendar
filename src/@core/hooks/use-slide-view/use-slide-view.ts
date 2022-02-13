import { addDays, startOfToday } from "date-fns";
import { useCalendarViewManager } from "../../providers";
import { useCalendarDate } from "../../providers/calendar-date";

export const useSlideView = () => {
  const {
    currentView: { change },
  } = useCalendarViewManager();
  const { selectedDate, setSelectedDate } = useCalendarDate();

  return (direction: number) => {
    setSelectedDate(addDays(selectedDate, direction * change).valueOf());
  };
};

export const useSlideToToday = () => {
  const { setSelectedDate } = useCalendarDate();

  return () => {
    setSelectedDate(startOfToday().valueOf());
  };
};
