import { useDispatch, useStore } from "react-redux";
import { useFirebaseReduxManager } from "./use-firebase-redux-manager";

export const useFirebaseRedux = () => {
  useFirebaseReduxManager();
  return { store: useStore(), dispatch: useDispatch() };
};
