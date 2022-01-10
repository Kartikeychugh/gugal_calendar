import { Action, Reducer } from "../../../redux";

export interface EventsState {
  events: CalendarEventItem[];
}
export type EventsActionPayload = [];
export type EventsActionType = "SET_CALENDAR_EVENTS";
export type EventsReducer = Reducer<
  EventsState,
  Action<EventsActionType, EventsActionPayload>
>;
