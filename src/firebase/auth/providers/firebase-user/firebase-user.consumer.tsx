import { useContext } from "react";
import { FirebaseUserContext } from "./firebase-user.context";

export const useFirebaseUser = () => {
  return useContext(FirebaseUserContext);
};
