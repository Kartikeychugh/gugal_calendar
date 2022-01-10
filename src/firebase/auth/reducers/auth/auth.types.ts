import { User } from "@firebase/auth";
import { Action, Reducer } from "../../../redux";

import { AuthDetailsState } from "./auth.reducer";

export type AuthDetailsActionPayload = User | null | undefined;
export type AuthDetailsActionType = "ADD_USER" | "INIT_authDetails";
export type AuthDetailsReducer = Reducer<
  AuthDetailsState,
  Action<AuthDetailsActionType, AuthDetailsActionPayload>
>;
