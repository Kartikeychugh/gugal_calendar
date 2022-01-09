import { useContext } from "react";
import { FirebaseReduxContext } from "../context/firebase-redux-store.context";

export const useAddReducer = () => {
  const { firebaseReduxManager } = useContext(FirebaseReduxContext);
  if (!firebaseReduxManager) {
    throw new Error(
      "Please ensure FirebaseReduxLayer is wrapped in your application"
    );
  }

  return firebaseReduxManager.addReducer;
};
