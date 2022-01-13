import { useEffect } from "react";
import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarEvents = () => {
  const firebaseGAPIManager = useFirebaseGAPIManager();
  const { dispatch } = useFirebaseRedux();
  const { events } = useFirebaseReduxSelector(
    (state: RootState) => state.calendarEvents
  );

  useEffect(() => {
    dispatch(firebaseGAPIManager.getGapiActions().fetchCalendarEvents());
  }, [dispatch, firebaseGAPIManager]);

  return events;
};
