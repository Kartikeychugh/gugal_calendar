import { startOfWeek } from "date-fns";
import { useContext, useEffect, useMemo } from "react";
import { CalendarViewContext } from "../@core";
import { ICalendarEventItem } from "../models";
import { useDispatch, useSelector } from "../redux";
import { getViewKey } from "../utils";
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
