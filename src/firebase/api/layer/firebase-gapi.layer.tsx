import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { dynamicScriptLoad } from "../../../utils/dynamic-script-load";
import { useAddReducer, useAddSaga, useFirebaseRedux } from "../../redux";
import { FirebaseGAPIContext } from "../context/firebase-gapi.context";
import { FirebaseGAPIManager } from "../manager";
import { calendarEventsReducer } from "../reducers";
import { calendarColorsReducer } from "../reducers/colors/colors.reducer";
import {
  initCalendarColorsSaga,
  initFirebaseGAPISaga,
} from "../sagas/firebase-gapi.saga";
import { FirebaseGAPIService } from "../services/firebase-gapi.service";

export const FirebaseGAPILayer = (props: PropsWithChildren<{}>) => {
  const [done, setDone] = useState(false);
  const firebaseGAPIManager = useMemo(() => FirebaseGAPIManager(), []);
  const addSaga = useAddSaga();
  const addReducer = useAddReducer();
  const { dispatch } = useFirebaseRedux();

  useEffect(() => {
    dynamicScriptLoad("https://apis.google.com/js/api.js").then(() => {
      const firebaseGAPIService = new FirebaseGAPIService(gapi);
      addSaga(initFirebaseGAPISaga(firebaseGAPIService));
      addSaga(initCalendarColorsSaga(firebaseGAPIService));

      addReducer("calendarEvents", calendarEventsReducer);
      addReducer("calendarColors", calendarColorsReducer);

      dispatch({ type: "REHYDRATE_CALENDAR_COLORS" });
      dispatch({ type: "REHYDRATE_CALENDAR_EVENTS" });

      firebaseGAPIManager.initialise();

      setDone(true);
    });
  }, [addSaga, firebaseGAPIManager, addReducer, dispatch]);

  if (!done) {
    return null;
  }

  return (
    <FirebaseGAPIContext.Provider value={{ firebaseGAPIManager }}>
      {props.children}
    </FirebaseGAPIContext.Provider>
  );
};
