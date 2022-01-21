import {
  differenceInCalendarDays,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import addDays from "date-fns/addDays";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";

export const useSetWindowAndView = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view);
  const { start } = useSelector((state) => state.window);

  return (date: Date) => {
    const newStartOfTheWeek = startOfWeek(date);
    const diffInWeeks = differenceInCalendarDays(newStartOfTheWeek, start);

    if (diffInWeeks !== 0) {
      dispatch({
        type: "SET_WINDOW",
        payload: newStartOfTheWeek.valueOf(),
      });
    }

    const isNewDateWithinViewWindow = isWithinInterval(date, {
      start: addDays(newStartOfTheWeek, view.fromDay),
      end: addDays(newStartOfTheWeek, view.fromDay + view.numberOfDays - 1),
    });

    dispatch({
      type: "SET_VIEW",
      payload: {
        ...view,
        pointer: date.getDay(),
        ...(!isNewDateWithinViewWindow ? { fromDay: date.getDay() } : {}),
      },
    });
  };
};
