import { FirebaseContext, useFirebase } from "../../context";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { FirebaseAuthListener } from "../internal/listeners";
import { FirebaseAuthService } from "../internal/services";
import { authDetailsReducer } from "../internal/reducers";
import { initAuthDetailsSaga } from "../internal/sagas";
import { useFirebaseReduxStore } from "../../effects/use-firebase-redux-store";

export const FirebaseAuthLayer = (props: PropsWithChildren<{}>) => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const store = useFirebaseReduxStore();
  const firebaseContext = useFirebase();
  const firebaseAuth = getAuth(firebaseContext.firebaseApp);
  const googleAuthProvider = useMemo(() => new GoogleAuthProvider(), []);

  useEffect(() => {
    function initReducer() {
      store.addReducer("auth", authDetailsReducer);
    }

    function initSaga() {
      const firebaseStoreService = new FirebaseAuthService(
        firebaseAuth,
        googleAuthProvider
      );

      const saga = initAuthDetailsSaga(firebaseStoreService);
      store.addSaga(saga);
    }

    try {
      initReducer();
      initSaga();
      setDone(true);
    } catch (e) {
      setError(true);
    }
  }, [store, firebaseAuth, googleAuthProvider]);

  if (error) {
    return <div>Internal Error</div>;
  }

  if (!done) {
    return <div>Initialising app layer</div>;
  }

  return (
    <FirebaseContext.Provider
      value={{ ...firebaseContext, firebaseAuth, googleAuthProvider }}>
      <FirebaseAuthListener>{props.children}</FirebaseAuthListener>
    </FirebaseContext.Provider>
  );
};
