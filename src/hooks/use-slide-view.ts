import { addDays, startOfToday } from "date-fns";
import { useCalendarView } from "../@core";

export const useSlideView = () => {
  const {
    selectedDate,
    currentView: { change },
    setCalendarSelectedDate,
  } = useCalendarView();

  return (direction: number) => {
    setCalendarSelectedDate(
      addDays(selectedDate, direction * change).valueOf()
    );
  };
};

export const useSlideToToday = () => {
  const { setCalendarSelectedDate } = useCalendarView();

  return () => {
    setCalendarSelectedDate(startOfToday().valueOf());
  };
};
