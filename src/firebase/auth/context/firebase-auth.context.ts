import React from "react";
import { Auth, GoogleAuthProvider } from "@firebase/auth";
import { IFirebaseAuthManager } from "../managers/auth-manager";

export interface IFirebaseAuthContext {
  firebaseAuth: Auth | undefined;
  googleAuthProvider: GoogleAuthProvider | undefined;
  firebaseAuthManager: IFirebaseAuthManager | undefined;
}

export const FirebaseAuthContext = React.createContext<IFirebaseAuthContext>({
  firebaseAuth: undefined,
  googleAuthProvider: undefined,
  firebaseAuthManager: undefined,
});
