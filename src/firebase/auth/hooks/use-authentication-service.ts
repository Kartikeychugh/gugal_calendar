import { RootState, useFirebaseReduxSelector } from "../../redux";

import { useAuthActions } from "../reducers";

export const useAuthenticationService = () => {
  const auth = useFirebaseReduxSelector((state: RootState) => state.auth);
  const { signIn } = useAuthActions();

  return {
    getUser: () => {
      return auth ? auth.user : undefined;
    },
    signIn: () => {
      signIn();
    },
  };
};
