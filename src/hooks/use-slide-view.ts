import addDays from "date-fns/addDays";
import startOfToday from "date-fns/startOfToday";
import { useSelector } from "../redux/hooks/use-selector";
import { useSetWindowAndView } from "./use-set-window";

export const useSlideView = () => {
  const { start } = useSelector((state) => state.window);
  const { fromDay, change } = useSelector((state) => state.view);
  const setWindowAndView = useSetWindowAndView();

  return (direction: number) => {
    let newFromDay = direction * change;
    setWindowAndView(addDays(addDays(start, fromDay), newFromDay));
  };
};

export const useSlideToToday = () => {
  const setWindowAndView = useSetWindowAndView();

  return () => {
    setWindowAndView(startOfToday());
  };
};
