import { Action, Reducer } from "../../../../redux";

import { AuthDetailsState } from "./auth.reducer";
import { User } from "firebase/auth";

export type AuthDetailsActionPayload = User | null | undefined;
export type AuthDetailsActionType = "ADD_USER" | "INIT_authDetails";
export type AuthDetailsReducer = Reducer<
  AuthDetailsState["auth"],
  Action<AuthDetailsActionType, AuthDetailsActionPayload>
>;
