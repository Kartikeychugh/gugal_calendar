import { AuthDetailsReducer } from "./auth.types";
import { User } from "firebase/auth";

const INITIAL_STATE = {
  user: undefined,
};

export interface AuthDetailsState {
  auth: { user: User | null | undefined };
}

export const authDetailsReducer: AuthDetailsReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
