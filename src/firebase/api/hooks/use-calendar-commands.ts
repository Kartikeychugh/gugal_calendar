import { useEffect } from "react";
import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarCommands = () => {
  const firebaseGAPIManager = useFirebaseGAPIManager();
  const { events } = useFirebaseReduxSelector(
    (state: RootState) => state.calendarEvents
  );
  const { dispatch } = useFirebaseRedux();

  useEffect(() => {
    dispatch(firebaseGAPIManager.getGapiActions().fetchCalendarEvents());
  }, [dispatch, firebaseGAPIManager]);

  return events;
};
