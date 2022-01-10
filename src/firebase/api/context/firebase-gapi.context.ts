import React from "react";
import { IFirebaseGAPIManager } from "../manager/gapi-manager";

export interface IFirebaseGAPI {
  firebaseGAPIManager: IFirebaseGAPIManager | undefined;
}

export const FirebaseGAPIContext = React.createContext<IFirebaseGAPI>({
  firebaseGAPIManager: undefined,
});
