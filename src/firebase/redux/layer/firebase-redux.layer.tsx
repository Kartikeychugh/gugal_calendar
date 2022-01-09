import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Provider } from "react-redux";
import { FirebaseReduxManager } from "../managers/redux-manager";
import { FirebaseReduxContext } from "../context/firebase-redux-store.context";

export const FirebaseReduxLayer = (props: PropsWithChildren<{}>) => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const firebaseReduxManager = useMemo(() => FirebaseReduxManager(), []);

  useEffect(() => {
    try {
      firebaseReduxManager.initialise();
      setDone(true);
    } catch (e) {
      setError(true);
    }
  }, [firebaseReduxManager]);

  if (error) {
    return <div>Internal Error</div>;
  }

  if (!done) {
    return <div>Loading</div>;
  }

  return (
    <FirebaseReduxContext.Provider value={{ firebaseReduxManager }}>
      <Provider store={firebaseReduxManager.getStore()}>
        {props.children}
      </Provider>
    </FirebaseReduxContext.Provider>
  );
};
