import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Provider } from "react-redux";
import { FirebaseReduxManager } from "../managers/redux-manager";
import {
  FirebaseReduxContext,
  FirebaseReduxStoreContext,
} from "../context/firebase-redux-store.context";

export const FirebaseReduxLayer = (props: PropsWithChildren<{}>) => {
  const [done, setDone] = useState(false);
  const firebaseReduxManager = useMemo(() => FirebaseReduxManager(), []);

  useEffect(() => {
    firebaseReduxManager.initialise();
    setDone(true);
  }, [firebaseReduxManager]);

  if (!done) {
    return null;
  }

  return (
    <FirebaseReduxContext.Provider value={{ firebaseReduxManager }}>
      <Provider
        context={FirebaseReduxStoreContext}
        store={firebaseReduxManager.getStore()}>
        {props.children}
      </Provider>
    </FirebaseReduxContext.Provider>
  );
};
