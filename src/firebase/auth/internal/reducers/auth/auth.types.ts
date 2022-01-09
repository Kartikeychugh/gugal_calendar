import { User } from "@firebase/auth";

import { AuthDetailsState } from "./auth.reducer";
import { Action, Reducer } from "../../../../redux";

export type AuthDetailsActionPayload = User | null | undefined;
export type AuthDetailsActionType = "ADD_USER" | "INIT_authDetails";
export type AuthDetailsReducer = Reducer<
  AuthDetailsState["auth"],
  Action<AuthDetailsActionType, AuthDetailsActionPayload>
>;
