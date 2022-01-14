import { useEffect } from "react";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";

export const useCalendarEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch({ type: "FETCH_CALENDAR_EVENTS" });

    setInterval(() => {
      dispatch({ type: "FETCH_CALENDAR_EVENTS" });
    }, 60000);
  }, [dispatch]);

  return events;
};
