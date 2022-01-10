import { useSelector } from "react-redux";
import { RootState } from "../types";

import { useFirebaseReduxManager } from "./use-firebase-redux-manager";

export const useFirebaseReduxSelector = <
  TState = RootState,
  TSelected = unknown
>(
  selector: (state: TState) => TSelected,
  equalityFn?: ((left: unknown, right: unknown) => boolean) | undefined
) => {
  useFirebaseReduxManager();
  return useSelector(selector, equalityFn);
};
