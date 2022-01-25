import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ICalendarEventItem } from "../../../models";

export type IEventsState = {
  backend: { [key: string]: ICalendarEventItem[] };
  client: ICalendarEventItem | null;
};

const INITIAL_STATE: IEventsState = {
  backend: {},
  client: null,
};

const _CalendarEventsReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: { [key: string]: ICalendarEventItem[] } | ICalendarEventItem;
  }
): IEventsState => {
  switch (action.type) {
    case "SET_BACKEND_EVENTS":
      return {
        ...state,
        backend: { ...state.backend, ...action.payload } as {
          [key: string]: ICalendarEventItem[];
        },
      };
    case "SET_CLIENT_EVENTS":
      return { ...state, client: action.payload as ICalendarEventItem };
    case "REMOVE_CLIENT_EVENT":
      const _state = { ...state };
      _state.client = null;

      return _state;
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
