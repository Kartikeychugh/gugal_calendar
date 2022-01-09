import {
  AuthDetailsActionPayload,
  AuthDetailsActionType,
  AuthDetailsReducer,
  AuthDetailsState,
} from "../auth/internal";

export interface Action<T, P> {
  type: T;
  payload?: P;
}

export type Reducer<S, P> = (state: S, action: P) => S;

export interface RootState extends AuthDetailsState {}
export type RootActionType = AuthDetailsActionType | "";
export type RootActionPayload = AuthDetailsActionPayload;
export type RootAction = Action<RootActionType, RootActionPayload>;
export type Reducers = AuthDetailsReducer;
