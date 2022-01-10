import { EventsReducer, EventsState } from "./events.types";

const INITIATE_STATE: EventsState = {
  events: [],
};

export const calendarEventsReducer: EventsReducer = (
  state = INITIATE_STATE,
  action
) => {
  switch (action.type) {
    case "SET_CALENDAR_EVENTS":
      return { ...state, events: action.payload };
    default:
      return state;
  }
};
