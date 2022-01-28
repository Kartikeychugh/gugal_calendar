import { useContext } from "react";
import { FirebaseAuthLayerContext } from "./firebase-auth-layer.context";

export const useFirebaseAuthLayer = () => {
  return useContext(FirebaseAuthLayerContext);
};
