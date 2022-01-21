import { ICalendarEventItem } from "../../../models/calendar-event-item";

export type IEventsState = {
  backend: { [key: string]: ICalendarEventItem[] } | null;
  client: ICalendarEventItem | null;
};

const INITIAL_STATE: IEventsState = {
  backend: {},
  client: null,
};

export const CalendarEventsReducer = (
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
