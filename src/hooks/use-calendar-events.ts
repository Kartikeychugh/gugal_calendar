import { useEffect, useMemo } from "react";
import { ICalendarEventItem } from "../models/calendar-event-item";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";
import { getViewKey } from "../utils/get-view-details";

export const useCalendarEvents = () => {
  const dispatch = useDispatch();
  const { backend, client } = useSelector((state) => state.events);
  const { start } = useSelector((state) => state.window);
  const key = useMemo(() => getViewKey(start), [start]);
  const backendEventsForCurrentStartWindow = useMemo(
    () => backend[`${key}`],
    [backend, key]
  );

  useEffect(() => {
    if (!backendEventsForCurrentStartWindow) {
      dispatch({ type: "FETCH_CALENDAR_EVENTS", payload: { start } });
    }

    const intervalID = setInterval(() => {
      dispatch({ type: "FETCH_CALENDAR_EVENTS", payload: { start } });
    }, 60000);

    return () => {
      clearInterval(intervalID);
    };
  }, [dispatch, start, backendEventsForCurrentStartWindow]);

  let clientEventAlreadySynced = false;
  if (client && backendEventsForCurrentStartWindow) {
    const index = backendEventsForCurrentStartWindow.findIndex(
      (event: ICalendarEventItem) => event.id === client.id
    );
    if (index !== -1) {
      clientEventAlreadySynced = true;
    }
  }

  return [
    ...(backendEventsForCurrentStartWindow
      ? backendEventsForCurrentStartWindow
      : []),
    ...(client && !clientEventAlreadySynced ? [client] : []),
  ].sort((a: any, b: any) => {
    return (
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
    );
  });
};
