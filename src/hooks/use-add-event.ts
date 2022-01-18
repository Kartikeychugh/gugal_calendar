import { CalendarEvent } from "../models/Events";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { v4 as uuidv4 } from "uuid";

export const useAddGoogleEvent = () => {
  const dispatch = useDispatch();

  return (event: any, summay: string, onlineMeeting = false) => {
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

export const useAddClientEvent = () => {
  const dispatch = useDispatch();

  return (start: Date, end: Date, clientX: number, clientY: number) => {
    const e = CalendarEvent("", "", start, end, clientX, clientY, false);

    dispatch({
      type: "SET_CLIENT_EVENTS",
      payload: e,
    });
  };
};
