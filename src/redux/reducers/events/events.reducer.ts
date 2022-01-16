import { ICalendarEventItem } from "../../../models/calendar-event-item";

export type IEventsState = {
  backend: ICalendarEventItem[] | null;
  client: any[] | null;
};

const INITIAL_STATE: IEventsState = {
  backend: null,
  client: null,
};

export const CalendarEventsReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: ICalendarEventItem[] | ICalendarEventItem | number;
  }
): IEventsState => {
  switch (action.type) {
    case "SET_BACKEND_EVENTS":
      return { ...state, backend: action.payload as ICalendarEventItem[] };
    case "SET_CLIENT_EVENTS":
      return { ...state, client: [...(state.client || []), action.payload] };
    case "REMOVE_CLIENT_EVENT":
      const _state = { ...state };
      if (_state.client) {
        _state.client = _state.client.filter(
          (event) => action.payload !== event.id
        );
      }

      return _state;
    default:
      return state;
  }
};
