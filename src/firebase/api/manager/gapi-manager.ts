import { createFirebaseErrorObj } from "../../utils";

const uninitializedFn = () => {
  throw createFirebaseErrorObj(
    "FirebaseGAPIManager_uninitialised",
    "Please ensure FirebaseGAPIManager is initialised"
  );
};

interface FirebaseGAPIActions {
  fetchCalendarEvents: () => {
    type: "FETCH_CALENDAR_EVENTS";
  };
  fetchColors: () => { type: "FETCH_COLORS" };
}

export interface IFirebaseGAPIManager {
  initialise: () => void;
  getGapiActions: () => FirebaseGAPIActions;
}

export const FirebaseGAPIManager = (): IFirebaseGAPIManager => {
  let gapiActions: FirebaseGAPIActions = {
    fetchCalendarEvents: uninitializedFn,
    fetchColors: uninitializedFn,
  };

  return {
    initialise: () => {
      gapiActions = {
        fetchCalendarEvents: () => {
          return {
            type: "FETCH_CALENDAR_EVENTS",
          };
        },
        fetchColors: () => {
          return {
            type: "FETCH_COLORS",
          };
        },
      };
    },
    getGapiActions: () => gapiActions,
  };
};
