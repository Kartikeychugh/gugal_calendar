import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Auth, GoogleAuthProvider, getAuth } from "@firebase/auth";

import {
  FirebaseAuthListener,
  FirebaseAuthService,
  authDetailsReducer,
  initAuthDetailsSaga,
} from "../internal";

import {
  useAddReducer,
  useAddSaga,
  useFirebaseReduxDispatch,
} from "../../redux";
import { useFirebase } from "../../core";
import { FirebaseAuthContext } from "../context/firebase-auth.context";
import {
  FirebaseAuthManager,
  IFirebaseAuthManager,
} from "../internal/managers/auth-manager";

export const FirebaseAuthLayer = (props: PropsWithChildren<{}>) => {
  const { firebaseAuth, googleAuthProvider } = useFirebaseAuthContextInit();
  const firebaseAuthManager = useMemo(() => FirebaseAuthManager(), []);

  const { done, error } = useInitialisation({
    firebaseAuth,
    googleAuthProvider,
    firebaseAuthManager,
  });

  if (error) {
    return <div>Internal Error</div>;
  }

  if (!done) {
    return <>Initialising</>;
  }

  return (
    <FirebaseAuthContext.Provider
      value={{ firebaseAuth, googleAuthProvider, firebaseAuthManager }}>
      <FirebaseAuthListener>{props.children}</FirebaseAuthListener>
    </FirebaseAuthContext.Provider>
  );
};

const useInitialisation = (props: {
  firebaseAuth: Auth;
  googleAuthProvider: GoogleAuthProvider;
  firebaseAuthManager: IFirebaseAuthManager;
}) => {
  const { firebaseAuth, googleAuthProvider, firebaseAuthManager } = props;
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const addSaga = useAddSaga();
  const addReducer = useAddReducer();
  const dispatch = useFirebaseReduxDispatch();

  useEffect(() => {
    function initReducer() {
      addReducer("auth", authDetailsReducer);
      dispatch({ type: "" });
    }

    function initSaga() {
      addSaga(
        initAuthDetailsSaga(
          new FirebaseAuthService(firebaseAuth, googleAuthProvider)
        )
      );
    }

    try {
      initReducer();
      initSaga();
      firebaseAuthManager.initialise();
      setDone(true);
    } catch (e) {
      setError(true);
    }
  }, [addReducer, addSaga, dispatch, firebaseAuth, googleAuthProvider]);

  return { done, error };
};
function useFirebaseAuthContextInit() {
  const { firebaseApp } = useFirebase();

  const firebaseAuth = useMemo(() => getAuth(firebaseApp), []);
  const googleAuthProvider = useMemo(() => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope(
      "https://www.googleapis.com/auth/calendar.readonly"
    );
    return googleAuthProvider;
  }, []);

  return {
    firebaseAuth,
    googleAuthProvider,
  };
}
