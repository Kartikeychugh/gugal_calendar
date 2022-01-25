import { createSelectorHook } from "react-redux";
import { FirebaseReduxStoreContext } from "../context";
import { RootState } from "../types";

import { useFirebaseReduxManager } from "./use-firebase-redux-manager";

const useFirebaseSelector = createSelectorHook(FirebaseReduxStoreContext);

export const useFirebaseReduxSelector = <
  TState = RootState,
  TSelected = unknown
>(
  selector: (state: TState) => TSelected,
  equalityFn?: ((left: unknown, right: unknown) => boolean) | undefined
) => {
  useFirebaseReduxManager();
  return useFirebaseSelector(selector, equalityFn);
};
