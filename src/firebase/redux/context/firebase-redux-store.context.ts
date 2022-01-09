import React from "react";
import { IFirebaseReduxManager } from "..";

export interface IFirebaseReduxContext {
  firebaseReduxManager: IFirebaseReduxManager | undefined;
}
export const FirebaseReduxContext = React.createContext<IFirebaseReduxContext>({
  firebaseReduxManager: undefined,
});
