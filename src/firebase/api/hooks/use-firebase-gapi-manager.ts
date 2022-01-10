import { useContext } from "react";
import { createFirebaseErrorObj } from "../../utils";
import { FirebaseGAPIContext } from "../context/firebase-gapi.context";

export const useFirebaseGAPIManager = () => {
  const { firebaseGAPIManager } = useContext(FirebaseGAPIContext);
  if (!firebaseGAPIManager) {
    throw createFirebaseErrorObj(
      "FirebaseGAPILayer_unwrapped",
      "Please ensure FirebaseGAPILayer is wrapped in your application"
    );
  }

  return firebaseGAPIManager;
};
