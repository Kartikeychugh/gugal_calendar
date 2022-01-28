import { useEffect, useMemo } from "react";
import { useCalendarView } from "../@core";
import { ICalendarEventItem } from "../models";
import { useDispatch, useSelector } from "../redux";
import { getViewKey } from "../utils";
import { useCalendarColors } from "./use-calendar-colors";

export const useCalendarEvents = () => {
  const { startOfWeekForSelectedDate } = useCalendarView();
  useSyncCalendarEvents(startOfWeekForSelectedDate);
  return useResolveCalendarEvents(startOfWeekForSelectedDate);
};

const useSyncCalendarEvents = (startOfWeekForSelectedDate: number) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_CALENDAR_EVENTS",
      payload: { start: startOfWeekForSelectedDate },
    });

    const intervalID = setInterval(() => {
      dispatch({
        type: "FETCH_CALENDAR_EVENTS",
        payload: { start: startOfWeekForSelectedDate },
      });
    }, 60000);

    return () => {
      clearInterval(intervalID);
    };
  }, [dispatch, startOfWeekForSelectedDate]);
};

const useResolveCalendarEvents = (startOfWeekForSelectedDate: number) => {
  const { backend, client } = useSelector((state) => state.events);

  const backendEvents = useMemo(() => {
    return backend[getViewKey(startOfWeekForSelectedDate)];
  }, [backend, startOfWeekForSelectedDate]);

  const colors = useCalendarColors();

  if (!colors) {
    return [];
  }

  const clientEventAlreadySynced = isClientEventAlreadySynced(
    client,
    backendEvents
  );

  return [
    ...(backendEvents ? backendEvents : []),
    ...(client && !clientEventAlreadySynced ? [client] : []),
  ].sort((a: ICalendarEventItem, b: ICalendarEventItem) => {
    return (
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
    );
  });
};

const isClientEventAlreadySynced = (
  client: ICalendarEventItem | null,
  backendEvents: ICalendarEventItem[]
) => {
  if (client && backendEvents) {
    const index = backendEvents.findIndex(
      (event: ICalendarEventItem) => event.id === client.id
    );
    if (index !== -1) {
      return true;
    }
  }
  return false;
};
