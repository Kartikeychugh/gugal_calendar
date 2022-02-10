import { addDays, startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarViewContext } from "../../providers";

export const useSlideView = () => {
  const {
    selectedDate,
    setSelectedDate,
    currentView: { change },
  } = useContext(CalendarViewContext);

  return (direction: number) => {
    setSelectedDate(addDays(selectedDate, direction * change).valueOf());
  };
};

export const useSlideToToday = () => {
  const { setSelectedDate } = useContext(CalendarViewContext);

  return () => {
    setSelectedDate(startOfToday().valueOf());
  };
};
