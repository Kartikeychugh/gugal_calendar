import { FirebaseOptions, initializeApp } from "@firebase/app";

import { FirebaseContext } from "./firebase.context";
import { Provider } from "react-redux";
import { createReduxStore } from "../redux/store";

export const FirebaseProvider = (
  props: React.PropsWithChildren<{ firebaseOptions: FirebaseOptions }>
) => {
  const { children, firebaseOptions } = props;

  return (
    <FirebaseContext.Provider
      value={{ firebaseApp: initializeApp(firebaseOptions) }}>
      <Provider store={createReduxStore()}>{children}</Provider>
    </FirebaseContext.Provider>
  );
};
