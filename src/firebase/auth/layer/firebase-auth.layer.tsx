import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Auth, GoogleAuthProvider, getAuth } from "@firebase/auth";

import { useAddSaga, useFirebaseRedux } from "../../redux";
import { useFirebase } from "../../core";
import { FirebaseAuthContext } from "../context/firebase-auth.context";
import {
  FirebaseAuthManager,
  IFirebaseAuthManager,
} from "../managers/auth-manager";
import { FirebaseAuthListener } from "../listeners";
import { FirebaseAuthService } from "../services";
import { initAuthDetailsSaga } from "../sagas";

export const FirebaseAuthLayer = (
  props: PropsWithChildren<{ loading: () => JSX.Element }>
) => {
  const { loading: Loading } = props;
  const { firebaseAuth, googleAuthProvider, firebaseAuthManager } =
    useCreateFirebaseAuthContext();

  const { done } = useInitialisation({
    firebaseAuth,
    googleAuthProvider,
    firebaseAuthManager,
  });

  if (!done) {
    return <Loading />;
  }

  return (
    <FirebaseAuthContext.Provider
      value={{ firebaseAuth, googleAuthProvider, firebaseAuthManager }}
    >
      <FirebaseAuthListener>{props.children}</FirebaseAuthListener>
    </FirebaseAuthContext.Provider>
  );
};

const useInitialisation = (props: {
  firebaseAuth: Auth;
  googleAuthProvider: GoogleAuthProvider;
  firebaseAuthManager: IFirebaseAuthManager;
}) => {
  const [done, setDone] = useState(false);
  const addSaga = useAddSaga();
  const { dispatch } = useFirebaseRedux();

  const { firebaseAuth, googleAuthProvider, firebaseAuthManager } = props;

  useEffect(() => {
    function initSaga() {
      addSaga(
        initAuthDetailsSaga(
          new FirebaseAuthService(firebaseAuth, googleAuthProvider)
        )
      );
    }

    function initManager() {
      firebaseAuthManager.initialise();
    }

    initSaga();
    initManager();
    setDone(true);
  }, [
    addSaga,
    dispatch,
    firebaseAuth,
    googleAuthProvider,
    firebaseAuthManager,
  ]);

  return { done };
};
const useCreateFirebaseAuthContext = () => {
  const { firebaseApp } = useFirebase();

  const firebaseAuth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);
  const googleAuthProvider = useMemo(() => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope("https://www.googleapis.com/auth/calendar");
    return googleAuthProvider;
  }, []);

  const firebaseAuthManager = useMemo(() => FirebaseAuthManager(), []);
  return { firebaseAuth, googleAuthProvider, firebaseAuthManager };
};
