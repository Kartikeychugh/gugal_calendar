import addDays from "date-fns/addDays";
import startOfToday from "date-fns/startOfToday";
import { useContext } from "react";
import { CalendarViewContext } from "../contexts/calendar-view/calendar-view.context";

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
