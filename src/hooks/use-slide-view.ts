import { addDays, startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarViewContext } from "../@core";

export const useSlideView = () => {
  const {
    selectedDate,
    currentView: { change },
    setCalendarSelectedDate,
  } = useContext(CalendarViewContext);

  return (direction: number) => {
    setCalendarSelectedDate(
      addDays(selectedDate, direction * change).valueOf()
    );
  };
};

export const useSlideToToday = () => {
  const { setCalendarSelectedDate } = useContext(CalendarViewContext);

  return () => {
    setCalendarSelectedDate(startOfToday().valueOf());
  };
};
