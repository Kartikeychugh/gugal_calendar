import { differenceInCalendarDays, startOfWeek } from "date-fns";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";
import { useUpdateView } from "./use-update-view";

export const useSetWindowAndView = () => {
  const dispatch = useDispatch();
  const { start } = useSelector((state) => state.window);
  const updateView = useUpdateView();
  return (date: Date) => {
    const newStartOfTheWeek = startOfWeek(date);
    const diffInWeeks = differenceInCalendarDays(newStartOfTheWeek, start);

    if (diffInWeeks !== 0) {
      dispatch({
        type: "SET_WINDOW",
        payload: newStartOfTheWeek.valueOf(),
      });
    }

    updateView(date.getDay());
  };
};
