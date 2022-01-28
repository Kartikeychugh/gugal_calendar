import React from "react";
import { Auth, GoogleAuthProvider } from "@firebase/auth";

export interface IFirebaseAuthLayerContext {
  firebaseAuth: Auth;
  googleAuthProvider: GoogleAuthProvider;
}

export const FirebaseAuthLayerContext =
  React.createContext<IFirebaseAuthLayerContext>({
    firebaseAuth: undefined!,
    googleAuthProvider: undefined!,
  });
