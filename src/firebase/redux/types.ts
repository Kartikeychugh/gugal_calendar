import {
  EventsReducer,
  EventsState,
} from "../api/reducers/events/events.types";
import {
  AuthDetailsActionPayload,
  AuthDetailsActionType,
  AuthDetailsReducer,
  AuthDetailsState,
} from "../auth/reducers";

export interface Action<T, P> {
  type: T;
  payload: P;
}

export type Reducer<S, P> = (state: S, action: P) => S;

export interface RootState {
  auth: AuthDetailsState;
  calendar: EventsState;
}
export type RootActionType = AuthDetailsActionType | "";
export type RootActionPayload = AuthDetailsActionPayload;
export type RootAction = Action<RootActionType, RootActionPayload>;
export type AnyFirebaseReduxReducer = AuthDetailsReducer | EventsReducer;
