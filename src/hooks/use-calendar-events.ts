import { startOfWeek } from "date-fns";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../redux";
import { getViewKey } from "../utils";
import { useCalendarColors } from "./use-calendar-colors";
import { ICalendarClientEventItem, ICalendarEvent } from "./../@core";
export const useCalendarEvents = (selectedDate: number) => {
  const startOfWeekForSelectedDate = startOfWeek(selectedDate).valueOf();
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

  const _client: ICalendarClientEventItem | null = client
    ? {
        ...client,
        colors: {
          calendar: {
            backgroundColor: "#B296FF",
          },
          event: {
            backgroundColor: "#471AC2",
            foregroundColor: "white",
          },
        },
      }
    : null;

  const _backendEvents = backendEvents
    ? backendEvents.map((event) => {
        const _event: ICalendarEvent = {
          ...event,
          colors: calculateColors(event, colors),
        };

        return _event;
      })
    : null;

  // return [];
  const clientEventAlreadySynced = isClientEventAlreadySynced(
    _client,
    _backendEvents
  );

  return [
    ...(_backendEvents ? _backendEvents : []),
    ...(_client && !clientEventAlreadySynced ? [_client] : []),
  ].sort(
    (
      a: ICalendarEvent | ICalendarClientEventItem,
      b: ICalendarEvent | ICalendarClientEventItem
    ) => {
      return (
        new Date(a.start.dateTime).getTime() -
        new Date(b.start.dateTime).getTime()
      );
    }
  );
};

const isClientEventAlreadySynced = (
  client: ICalendarClientEventItem | null,
  backendEvents: ICalendarEvent[] | null
) => {
  if (client && backendEvents) {
    const index = backendEvents.findIndex((event) => event.id === client.id);
    if (index !== -1) {
      return true;
    }
  }
  return false;
};

const calculateColors = (
  event: CalendarEventItem,
  colors: CalendarColors | null
) => {
  return {
    calendar: {
      backgroundColor:
        event.colorId && colors
          ? colors.calendar[event.colorId].background
          : "#B296FF",
    },
    event: {
      backgroundColor:
        event.colorId && colors
          ? colors.event[event.colorId].background
          : "#471AC2",
      foregroundColor:
        event.colorId && colors
          ? colors.event[event.colorId].foreground
          : "white",
    },
  };
};
