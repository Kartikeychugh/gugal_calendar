import { PropsWithChildren, useMemo, useReducer, useEffect } from "react";
import { IFirebaseUser, FirebaseUserContext } from ".";
import { useFirebaseAuthLayer } from "../firebase-auth-layer";
import { FirebaseAuthService, IFirebaseAuthService } from "../../services";
import { User } from "@firebase/auth";

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
  const { firebaseAuth, googleAuthProvider } = useFirebaseAuthLayer();

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

const googleSignIn = (
  firebaseAuthService: IFirebaseAuthService,
  state: User | null | undefined
) => {
  firebaseAuthService.signInWithGooglePopup();
  return state;
};
