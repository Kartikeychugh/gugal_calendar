import { createFirebaseErrorObj } from "../../utils";

const uninitializedFn = () => {
  throw createFirebaseErrorObj(
    "FirebaseGAPIManager_uninitialised",
    "Please ensure FirebaseGAPIManager is initialised"
  );
};

interface FirebaseGAPIActions {
  fetchCalendarEvents: () => { type: "FETCH_CALENDAR_EVENTS" };
}

export interface IFirebaseGAPIManager {
  initialise: () => void;
  getGapiActions: () => FirebaseGAPIActions;
}

export const FirebaseGAPIManager = (): IFirebaseGAPIManager => {
  let gapiActions: FirebaseGAPIActions = {
    fetchCalendarEvents: uninitializedFn,
  };

  return {
    initialise: () => {
      gapiActions = {
        fetchCalendarEvents: () => {
          return {
            type: "FETCH_CALENDAR_EVENTS",
          };
        },
      };
    },
    getGapiActions: () => gapiActions,
  };
};
