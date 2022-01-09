import { FirebaseOptions, initializeApp } from "@firebase/app";

import { FirebaseContext } from "./firebase.context";
import { FirebaseReduxLayer } from "../../redux";

export const FirebaseProvider = (
  props: React.PropsWithChildren<{ firebaseOptions: FirebaseOptions }>
) => {
  const { children, firebaseOptions } = props;

  return (
    <FirebaseContext.Provider
      value={{ firebaseApp: initializeApp(firebaseOptions) }}>
      <FirebaseReduxLayer>{children}</FirebaseReduxLayer>
    </FirebaseContext.Provider>
  );
};
