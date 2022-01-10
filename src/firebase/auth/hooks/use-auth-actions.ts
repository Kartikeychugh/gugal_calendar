import { User } from "@firebase/auth";
import { useFirebaseRedux } from "../../redux";

import { useFirebaseAuthManager } from "./use-firebase-auth-manager";

export const useAuthActions = () => {
  const firebaseAuthManager = useFirebaseAuthManager();
  const { dispatch } = useFirebaseRedux();
  const { addUser, signIn } = firebaseAuthManager.getAuthActions();

  return {
    addUser: (user: User | null) => dispatch(addUser(user)),
    signIn: () => {
      dispatch(signIn());
    },
  };
};
