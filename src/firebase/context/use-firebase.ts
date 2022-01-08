import { FirebaseContext } from "./firebase.context";
import { useContext } from "react";

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
