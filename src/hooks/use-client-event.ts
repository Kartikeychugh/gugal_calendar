import { useDispatch, useSelector } from "../redux";
import { startOfWeek } from "date-fns";
import {
  clientEventStatus,
  GetCalendarClientEvent,
  ICalendarClientEventItem,
} from "../@core";
import { combineDateAndTime } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";

const useSyncClientEventCallback = () => {
  const dispatch = useDispatch();

  return useCallback(
    (client: ICalendarClientEventItem | null) => {
      if (!client) {
        throw Error("Client event doesn't exist");
      }

      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: {
          ...client,
          client: { ...client.client, status: clientEventStatus.syncing },
        },
      });

      dispatch({
        type: "CREATE_CALENDAR_EVENTS",
        payload: client,
      });
    },
    [dispatch]
  );
};

const useUpdateOnlineMeetingCallback = () => {
  const dispatch = useDispatch();

  return useCallback(
    (client: ICalendarClientEventItem | null, onlineMeeting: boolean) => {
      if (!client) {
        throw Error("Client event doesn't exist");
      }

      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: {
          ...client,
          conferenceData: onlineMeeting
            ? {
                createRequest: {
                  requestId: uuidv4().replaceAll("-", ""),
                  conferenceSolutionKey: {
                    type: "hangoutsMeet",
                  },
                },
              }
            : undefined,
        },
      });
    },
    [dispatch]
  );
};

const useUpdateDateCallback = () => {
  const dispatch = useDispatch();

  return useCallback(
    (client: ICalendarClientEventItem | null, date: Date) => {
      if (!client) {
        throw Error("Client event doesn't exist");
      }

      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: {
          ...client,
          start: {
            ...client.start,
            dateTime: combineDateAndTime(
              date,
              client.start.dateTime
            ).toISOString(),
          },
          end: {
            ...client.start,
            dateTime: combineDateAndTime(
              date,
              client.end.dateTime
            ).toISOString(),
          },
        },
      });

      dispatch({
        type: "SET_WINDOW",
        payload: startOfWeek(date).valueOf(),
      });
    },
    [dispatch]
  );
};

const useUpdateEndTimeCallback = () => {
  const dispatch = useDispatch();

  return useCallback(
    (client: ICalendarClientEventItem | null, time: Date) => {
      if (!client) {
        throw Error("Client event doesn't exist");
      }

      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: {
          ...client,
          end: { ...client.end, dateTime: time.toISOString() },
        },
      });
    },
    [dispatch]
  );
};

const useUpdateStartTimeCallback = () => {
  const dispatch = useDispatch();

  return useCallback(
    (client: ICalendarClientEventItem | null, time: Date) => {
      if (!client) {
        throw Error("Client event doesn't exist");
      }

      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: {
          ...client,
          start: { ...client.start, dateTime: time.toISOString() },
        },
      });
    },
    [dispatch]
  );
};

const useUpdateMeetingTitleCallback = () => {
  const dispatch = useDispatch();

  return useCallback(
    (client: ICalendarClientEventItem | null, summary: string) => {
      if (!client) {
        throw Error("Client event doesn't exist");
      }

      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: { ...client, summary },
      });
    },
    [dispatch]
  );
};

function useCreateClientEventCallback() {
  const dispatch = useDispatch();

  return useCallback(
    (start: Date, end: Date) => {
      const clientEvent = GetCalendarClientEvent(start, end);
      /** Set state for client event */
      dispatch({
        type: "SET_CLIENT_EVENTS",
        payload: clientEvent,
      });

      /** Set state for current window so that view shifts according to the new client */
      dispatch({
        type: "SET_WINDOW",
        payload: startOfWeek(start).valueOf(),
      });
    },
    [dispatch]
  );
}

export const useClientEvent = () => {
  const createClientEvent = useCreateClientEventCallback();
  const updateMeetingTitle = useUpdateMeetingTitleCallback();
  const updateStartTime = useUpdateStartTimeCallback();
  const updateEndTime = useUpdateEndTimeCallback();
  const updateDate = useUpdateDateCallback();
  const updateOnlineMeeting = useUpdateOnlineMeetingCallback();
  const syncClientEvent = useSyncClientEventCallback();

  return {
    createClientEvent,
    updateOnlineMeeting,
    updateDate,
    updateEndTime,
    updateMeetingTitle,
    updateStartTime,
    syncClientEvent,
  };
};
