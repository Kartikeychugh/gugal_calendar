import { useFirebaseReduxManager } from "./use-firebase-redux-manager";

export const useAddReducer = () => {
  const firebaseReduxManager = useFirebaseReduxManager();
  return firebaseReduxManager.addReducer;
};
