import { useContext } from "react";
import { useStore } from "react-redux";

import { FirebaseReduxContext } from "../context/firebase-redux-store.context";

export const useFirebaseReduxStore = () => {
  const { firebaseReduxManager } = useContext(FirebaseReduxContext);
  if (!firebaseReduxManager) {
    throw new Error(
      "Please ensure FirebaseReduxLayer is wrapped in your application"
    );
  }

  return useStore();
};
