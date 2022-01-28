import {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  createContext,
  useReducer,
  useMemo,
} from "react";
import { User } from "@firebase/auth";
import { FirebaseAuthLayerContext } from "./firebase-auth-layer.context";
import { FirebaseAuthService, IFirebaseAuthService } from "../services";

export interface IFirebaseUser {
  user: User | null | undefined;
  dispatch: React.Dispatch<{
    type: string;
    payload?: IFirebaseUser["user"];
  }>;
}

export const FirebaseUserContext = createContext<IFirebaseUser>(undefined!);

const initReducer = (firebaseAuthService: IFirebaseAuthService) => {
  return (
    state: IFirebaseUser["user"],
    action: { type: string; payload?: IFirebaseUser["user"] }
  ) => {
    switch (action.type) {
      case "ADD_USER": {
        return action.payload;
      }
      case "GOOGLE_SIGN_IN":
        return googleSignIn(firebaseAuthService, state);
      default:
        return state;
    }
  };
};

export const FirebaseUserProvider = (props: PropsWithChildren<{}>) => {
  const { firebaseAuth, googleAuthProvider } = useContext(
    FirebaseAuthLayerContext
  );

  const firebaseAuthService = useMemo(
    () => new FirebaseAuthService(firebaseAuth, googleAuthProvider),
    [firebaseAuth, googleAuthProvider]
  );

  const [state, dispatch] = useReducer(
    initReducer(firebaseAuthService),
    undefined
  );

  useEffect(() => {
    firebaseAuth!.onAuthStateChanged((user) => {
      dispatch({ type: "ADD_USER", payload: user });
    });
  }, [firebaseAuth]);

  return (
    <FirebaseUserContext.Provider value={{ user: state, dispatch }}>
      {props.children}
    </FirebaseUserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(FirebaseUserContext);
};

const googleSignIn = (
  firebaseAuthService: IFirebaseAuthService,
  state: User | null | undefined
) => {
  firebaseAuthService.signInWithGooglePopup();
  return state;
};
