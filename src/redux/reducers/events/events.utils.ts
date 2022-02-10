import { startOfWeek } from "date-fns";
import { ICalendarEventItem } from "../../../@core";
import { IEventsState } from "./events.reducer";

export const setBackendEvents = (
  state: IEventsState,
  payload: IEventsState["backend"]
): IEventsState => {
  return {
    ...state,
    backend: { ...state.backend, ...payload },
  };
};

export const setClientEvent = (
  state: IEventsState,
  payload: IEventsState["client"]
): IEventsState => {
  return { ...state, client: payload };
};

export const addBackendEvent = (
  state: IEventsState,
  payload: ICalendarEventItem
): IEventsState => {
  const key = startOfWeek(new Date(payload.start.dateTime)).valueOf();
  return {
    ...state,
    backend: { ...state.backend, [`${key}`]: [...state.backend[key], payload] },
  };
};
