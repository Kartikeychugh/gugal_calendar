import addDays from "date-fns/addDays";
import startOfToday from "date-fns/startOfToday";
import { useUpdateSelectedDate } from "./use-set-window";
import { useView } from "./use-view";

export const useSlideView = () => {
  const { change, selectedDate } = useView();
  const setWindowAndView = useUpdateSelectedDate();

  return (direction: number) => {
    setWindowAndView(addDays(selectedDate, direction * change));
  };
};

export const useSlideToToday = () => {
  const setWindowAndView = useUpdateSelectedDate();

  return () => {
    setWindowAndView(startOfToday());
  };
};
