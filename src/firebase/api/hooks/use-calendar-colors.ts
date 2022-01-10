import { useEffect } from "react";
import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarColors = () => {
  const firebaseGAPIManager = useFirebaseGAPIManager();
  const { dispatch } = useFirebaseRedux();
  const { colors } = useFirebaseReduxSelector(
    (state: RootState) => state.calendarColors
  );

  useEffect(() => {
    dispatch(firebaseGAPIManager.getGapiActions().fetchColors());
  }, [dispatch, firebaseGAPIManager]);

  return colors;
};
