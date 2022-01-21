import { CalendarEvent, ICalendarClientEvent } from "../models/Events";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { v4 as uuidv4 } from "uuid";
import { ICalendarEventItem } from "../models/calendar-event-item";
import { startOfWeek } from "date-fns";

export const useCreateGoogleEvent = () => {
  const dispatch = useDispatch();

  return (
    event: ICalendarClientEvent,
    summay: string,
    onlineMeeting = false
  ) => {
    event.summary = summay;
    if (onlineMeeting) {
      event.conferenceData = {
        createRequest: {
          requestId: uuidv4().replaceAll("-", ""),
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      };
    }

    dispatch({ type: "CREATE_CALENDAR_EVENTS", payload: event });
  };
};

export const useCreateClientEvent = () => {
  const dispatch = useDispatch();

  return (start: Date, end: Date) => {
    const e = CalendarEvent(start, end);

    dispatch({
      type: "SET_CLIENT_EVENTS",
      payload: e,
    });

    dispatch({
      type: "SET_WINDOW",
      payload: startOfWeek(start).valueOf(),
    });
  };
};

export const useUpdateClientEvent = () => {
  const dispatch = useDispatch();

  return (event: ICalendarEventItem) => {
    dispatch({
      type: "SET_CLIENT_EVENTS",
      payload: event,
    });

    dispatch({
      type: "SET_WINDOW",
      payload: startOfWeek(new Date(event.start.dateTime)).valueOf(),
    });
  };
};
