import { RootState, useFirebaseReduxSelector } from "../../redux";

import { useAuthActions } from "../reducers";

export const useAuthenticationCommands = () => {
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
