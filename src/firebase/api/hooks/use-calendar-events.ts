import { useEffect } from "react";
import { useDispatch } from "../../../redux/hooks/use-dispatch";
import { useSelector } from "../../../redux/hooks/use-selector";
import {
  RootState,
  useFirebaseRedux,
  useFirebaseReduxSelector,
} from "../../redux";
import { useFirebaseGAPIManager } from "./use-firebase-gapi-manager";

export const useCalendarEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch({ type: "FETCH_CALENDAR_EVENTS" });
  }, [dispatch]);

  return events;
};
