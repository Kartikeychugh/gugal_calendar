import { User } from "@firebase/auth";
import { createFirebaseErrorObj } from "../../utils";

interface Actions {
  addUser: (_user: User | null) => { type: string; payload: User | null };
  signIn: () => { type: string };
}
export interface IFirebaseAuthManager {
  initialise: () => void;
  getAuthActions: () => Actions;
}

const uninitializedFn = () => {
  throw createFirebaseErrorObj(
    "FirebaseAuthManager_uninitialised",
    "Please ensure FirebaseAuthManager is initialised"
  );
};
export const FirebaseAuthManager = (): IFirebaseAuthManager => {
  let authActions: {
    addUser: Actions["addUser"];
    signIn: Actions["signIn"];
  } = {
    addUser: uninitializedFn,
    signIn: uninitializedFn,
  };

  return {
    initialise: () => {
      authActions = {
        addUser: (user: User | null) => {
          return {
            type: "ADD_USER",
            payload: user,
          };
        },
        signIn: () => {
          return {
            type: "SIGN_IN",
          };
        },
      };
    },
    getAuthActions: () => authActions,
  };
};
