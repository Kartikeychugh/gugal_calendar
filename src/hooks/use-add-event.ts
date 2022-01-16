import { CalendarEvent } from "../models/Events";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { getToday } from "../utils/get-current-week-dates";

export const useAddEvent = () => {
  const dispatch = useDispatch();

  return (start: Date, end: Date) => {
    const e = CalendarEvent("test", "test", start, end);

    dispatch({
      type: "SET_CLIENT_EVENTS",
      payload: e,
    });

    dispatch({
      type: "CREATE_CALENDAR_EVENTS",
      payload: e,
    });
  };
};
