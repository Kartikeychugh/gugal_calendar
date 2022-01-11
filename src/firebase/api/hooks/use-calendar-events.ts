import { useEffect } from "react";
import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarEvents = (cacheOnly = false) => {
  const firebaseGAPIManager = useFirebaseGAPIManager();
  const { dispatch } = useFirebaseRedux();
  const { events } = useFirebaseReduxSelector(
    (state: RootState) => state.calendarEvents
  );

  useEffect(() => {
    if (!cacheOnly) {
      dispatch(firebaseGAPIManager.getGapiActions().fetchCalendarEvents());
    }
  }, [dispatch, firebaseGAPIManager, cacheOnly]);

  return events;
};
