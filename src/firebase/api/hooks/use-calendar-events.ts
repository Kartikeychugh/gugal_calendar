import { useEffect } from "react";
import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarEvents = (datetime: number) => {
  const firebaseGAPIManager = useFirebaseGAPIManager();
  const { dispatch } = useFirebaseRedux();
  const { events } = useFirebaseReduxSelector(
    (state: RootState) => state.calendarEvents
  );
  const next = new Date(datetime);

  useEffect(() => {
    if (!events) {
      dispatch(firebaseGAPIManager.getGapiActions().fetchCalendarEvents());
    }
  }, [dispatch, firebaseGAPIManager, events]);

  return events?.filter(
    (event) => new Date(event.start.dateTime).getDate() === next.getDate()
  );
};
