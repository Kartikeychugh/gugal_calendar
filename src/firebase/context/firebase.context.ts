import { Auth, GoogleAuthProvider } from "firebase/auth";

import { FirebaseApp } from "@firebase/app";
import { Firestore } from "firebase/firestore";
import React from "react";

export interface IFirebaseContext {
  firebaseApp: FirebaseApp;
  firebaseAuth?: Auth;
  firebaseStore?: Firestore;
  googleAuthProvider?: GoogleAuthProvider;
}

export const FirebaseContext = React.createContext<IFirebaseContext>(
  undefined!
);
