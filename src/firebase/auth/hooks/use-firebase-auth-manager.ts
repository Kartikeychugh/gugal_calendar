import { useContext } from "react";
import { createFirebaseErrorObj } from "../../utils";
import { FirebaseAuthContext } from "../context";

export const useFirebaseAuthManager = () => {
  const { firebaseAuthManager } = useContext(FirebaseAuthContext);
  if (!firebaseAuthManager) {
    throw createFirebaseErrorObj(
      "FirebaseAuthLayer_unwrapped",
      "Please ensure FirebaseAuthLayer is wrapped in your application"
    );
  }

  return firebaseAuthManager;
};
