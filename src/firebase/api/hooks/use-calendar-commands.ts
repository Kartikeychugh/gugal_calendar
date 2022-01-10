import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarCommands = () => {
  const firebaseGAPIManager = useFirebaseGAPIManager();
  const { events } = useFirebaseReduxSelector(
    (state: RootState) => state.calendar
  );
  const { dispatch } = useFirebaseRedux();

  if (events.length === 0) {
    dispatch(firebaseGAPIManager.getGapiActions().fetchCalendarEvents());
  }

  return events;
};
