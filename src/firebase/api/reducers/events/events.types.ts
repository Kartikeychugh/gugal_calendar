import { Action, Reducer } from "../../../redux";

export interface EventsState {
  events: CalendarEventItem[] | undefined;
}
export type EventsActionPayload = [];
export type EventsActionType = "CACHE_CALENDAR_EVENTS";
export type EventsReducer = Reducer<
  EventsState,
  Action<EventsActionType, EventsActionPayload>
>;
