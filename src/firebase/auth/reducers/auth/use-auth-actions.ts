import { useContext } from "react";

import { User } from "@firebase/auth";
import { useFirebaseReduxDispatch } from "../../../redux";
import { FirebaseAuthContext } from "../../context";

export const useAuthActions = () => {
  const { firebaseAuthManager } = useContext(FirebaseAuthContext);
  const dispatch = useFirebaseReduxDispatch();

  if (!firebaseAuthManager) {
    throw new Error(
      "Please ensure FirebaseAuthLayer is wrapped in your application"
    );
  }

  const { addUser, signIn } = firebaseAuthManager.getAuthActions();

  return {
    addUser: (user: User | null) => dispatch(addUser(user)),
    signIn: () => {
      dispatch(signIn());
    },
  };
};
