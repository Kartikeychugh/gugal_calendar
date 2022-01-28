import { PropsWithChildren, useMemo } from "react";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";

import { useFirebase } from "../../core";
import { FirebaseAuthLayerContext, FirebaseUserProvider } from "../context";

export const FirebaseAuthLayer = (
  props: PropsWithChildren<{ loading: () => JSX.Element }>
) => {
  const { firebaseAuth, googleAuthProvider } =
    useCreateFirebaseAuthLayerContext();

  return (
    <FirebaseAuthLayerContext.Provider
      value={{ firebaseAuth, googleAuthProvider }}
    >
      <FirebaseUserProvider>{props.children}</FirebaseUserProvider>
    </FirebaseAuthLayerContext.Provider>
  );
};

const useCreateFirebaseAuthLayerContext = () => {
  const { firebaseApp } = useFirebase();

  const firebaseAuth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);
  const googleAuthProvider = useMemo(() => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope("https://www.googleapis.com/auth/calendar");
    return googleAuthProvider;
  }, []);

  return { firebaseAuth, googleAuthProvider };
};
