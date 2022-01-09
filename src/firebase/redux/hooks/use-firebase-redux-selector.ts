import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { FirebaseReduxContext } from "../context/firebase-redux-store.context";

export const useFirebaseReduxSelector = <
  TState = RootState,
  TSelected = unknown
>(
  selector: (state: TState) => TSelected,
  equalityFn?: ((left: unknown, right: unknown) => boolean) | undefined
) => {
  const { firebaseReduxManager } = useContext(FirebaseReduxContext);
  if (!firebaseReduxManager) {
    throw new Error(
      "Please ensure FirebaseReduxLayer is wrapped in your application"
    );
  }

  return useSelector(selector, equalityFn);
};
