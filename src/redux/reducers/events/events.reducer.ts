import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ICalendarClientEventItem } from "../../../@core";
import {
  addBackendEvent,
  setBackendEvents,
  setClientEvent,
} from "./events.utils";

export type IEventsState = {
  backend: { [key: string]: CalendarEventItem[] };
  client: ICalendarClientEventItem | null;
};

const INITIAL_STATE: IEventsState = {
  backend: {},
  client: null,
};

const _CalendarEventsReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload:
      | IEventsState["client"]
      | IEventsState["backend"]
      | CalendarEventItem;
  }
): IEventsState => {
  switch (action.type) {
    case "SET_BACKEND_EVENTS":
      return setBackendEvents(state, action.payload as IEventsState["backend"]);
    case "SET_CLIENT_EVENTS":
      return setClientEvent(state, action.payload as IEventsState["client"]);
    case "ADD_BACKEND_EVENT":
      return addBackendEvent(state, action.payload as CalendarEventItem);
    case "REMOVE_CLIENT_EVENT":
      return setClientEvent(state, null);

    default:
      return state;
  }
};

const config = {
  key: "events",
  whitelist: ["backend", "client"],
  storage,
};

export const CalendarEventsReducer = persistReducer(
  config,
  _CalendarEventsReducer
);
