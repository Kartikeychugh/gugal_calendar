import React from "react";

import { FirebaseApp } from "@firebase/app";
import { Firestore } from "@firebase/firestore";

export interface IFirebaseContext {
  firebaseApp: FirebaseApp;
  firebaseStore?: Firestore;
}

export const FirebaseContext = React.createContext<IFirebaseContext>(
  undefined!
);
