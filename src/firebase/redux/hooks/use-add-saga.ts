import { useFirebaseReduxManager } from "./use-firebase-redux-manager";

export const useAddSaga = () => {
  const firebaseReduxManager = useFirebaseReduxManager();
  return firebaseReduxManager.addSaga;
};
