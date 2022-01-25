import { startOfWeek } from "date-fns";
import { useContext, useEffect, useMemo } from "react";
import { CalendarViewContext } from "../@core/providers/calendar-view/calendar-view.context";
import { ICalendarEventItem } from "../models/calendar-event-item";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";
import { getViewKey } from "../utils/get-view-details";
import { useCalendarColors } from "./use-calendar-colors";

export const useCalendarEvents = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useContext(CalendarViewContext);
  const { backend, client } = useSelector((state) => state.events);

  const start = useMemo(() => startOfWeek(selectedDate), [selectedDate]);
  const colors = useCalendarColors();
  const key = useMemo(() => getViewKey(start), [start]);
  const backendEventsForCurrentStartWindow = useMemo(
    () => backend[`${key}`],
    [backend, key]
  );

  useEffect(() => {
    dispatch({ type: "FETCH_CALENDAR_EVENTS", payload: { start } });

    const intervalID = setInterval(() => {
      dispatch({ type: "FETCH_CALENDAR_EVENTS", payload: { start } });
    }, 60000);

    return () => {
      clearInterval(intervalID);
    };
  }, [dispatch, start, client]);

  if (!colors) {
    return [];
  }

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
  ].sort((a: ICalendarEventItem, b: ICalendarEventItem) => {
    return (
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
    );
  });
};
