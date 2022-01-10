import { useContext } from "react";
import { createFirebaseErrorObj } from "../../utils";
import { FirebaseReduxContext } from "../context/firebase-redux-store.context";

export const useFirebaseReduxManager = () => {
  const { firebaseReduxManager } = useContext(FirebaseReduxContext);
  if (!firebaseReduxManager) {
    throw createFirebaseErrorObj(
      "FirebaseReduxLayer_unwrapped",
      "Please ensure FirebaseReduxLayer is wrapped in your application"
    );
  }

  return firebaseReduxManager;
};
