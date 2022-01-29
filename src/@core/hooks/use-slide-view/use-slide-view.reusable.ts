import { addDays, startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarViewContextReusable } from "../../providers/calendar-view/calendar-view.context.reusable";
import { useCalendarView } from "../use-calendar-view";

export const useSlideViewReusable = () => {
  const {
    selectedDate,
    setSelectedDate,
    currentView: { change },
  } = useContext(CalendarViewContextReusable);

  return (direction: number) => {
    setSelectedDate(addDays(selectedDate, direction * change).valueOf());
  };
};

export const useSlideToTodayReusable = () => {
  const { setSelectedDate } = useContext(CalendarViewContextReusable);

  return () => {
    setSelectedDate(startOfToday().valueOf());
  };
};
