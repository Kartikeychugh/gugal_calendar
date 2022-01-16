import { useEffect } from "react";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";

export const useCalendarEvents = () => {
  const dispatch = useDispatch();
  const { backend, client } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch({ type: "FETCH_CALENDAR_EVENTS" });
    setInterval(() => {
      dispatch({ type: "FETCH_CALENDAR_EVENTS" });
    }, 60000);
  }, [dispatch]);

  const events = [...(backend || [])];
  const toBeRemoved: any[] = [];

  (client || []).forEach((event1: any) => {
    const index = backend.findIndex((event2: any) => event1.id === event2.id);
    if (index === -1) {
      events.push(event1);
    } else {
      toBeRemoved.push(event1);
    }
  });

  toBeRemoved.forEach((event) => {
    dispatch({
      type: "REMOVE_CLIENT_EVENT",
      payload: event.id,
    });
  });

  events.sort((a: any, b: any) => {
    return (
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
    );
  });
  return events;
};
