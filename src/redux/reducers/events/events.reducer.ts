import { ICalendarEventItem } from "../../../models/calendar-event-item";

export type IEventsState = ICalendarEventItem[] | null;

const INITIAL_STATE = null;

export const CalendarEventsReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: ICalendarEventItem[] }
): IEventsState => {
  switch (action.type) {
    case "SET_EVENTS":
      return action.payload;
    default:
      return state;
  }
};
