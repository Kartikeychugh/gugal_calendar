import { createDispatchHook } from "react-redux";
import { FirebaseReduxStoreContext } from "../context/firebase-redux-store.context";
import { useFirebaseReduxManager } from "./use-firebase-redux-manager";

const useFirebaseDispatch = createDispatchHook(FirebaseReduxStoreContext);

export const useFirebaseRedux = () => {
  useFirebaseReduxManager();
  return { dispatch: useFirebaseDispatch() };
};
