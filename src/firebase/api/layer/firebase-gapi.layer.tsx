import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { dynamicScriptLoad } from "../../../utils/dynamic-script-load";
import { useAddReducer, useAddSaga, useFirebaseRedux } from "../../redux";
import { FirebaseGAPIContext } from "../context/firebase-gapi.context";
import { FirebaseGAPIManager } from "../manager";
import { eventsReducer } from "../reducers";
import { initFirebaseGAPISaga } from "../sagas/firebase-gapi.saga";
import { FirebaseGAPIService } from "../services/firebase-gapi.service";

export const FirebaseGAPILayer = (props: PropsWithChildren<{}>) => {
  const [done, setDone] = useState(false);
  const firebaseGAPIManager = useMemo(() => FirebaseGAPIManager(), []);
  const addSaga = useAddSaga();
  const addReducer = useAddReducer();
  const { dispatch } = useFirebaseRedux();

  useEffect(() => {
    dynamicScriptLoad("https://apis.google.com/js/api.js").then(() => {
      addSaga(initFirebaseGAPISaga(new FirebaseGAPIService(gapi)));

      addReducer("calendar", eventsReducer);
      dispatch({ type: "" });

      firebaseGAPIManager.initialise();

      setDone(true);
    });
  }, [addSaga, firebaseGAPIManager, addReducer, dispatch]);

  if (!done) {
    return <div>Initialising API layer</div>;
  }

  return (
    <FirebaseGAPIContext.Provider value={{ firebaseGAPIManager }}>
      {props.children}
    </FirebaseGAPIContext.Provider>
  );
};
