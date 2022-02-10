import { PropsWithChildren, useMemo } from "react";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { FirebaseAuthLayerContext } from "./firebase-auth-layer.context";
import { FirebaseUserProvider } from "../firebase-user";
import { useFirebase } from "../../../core";

export const FirebaseAuthLayer = (props: PropsWithChildren<{}>) => {
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
