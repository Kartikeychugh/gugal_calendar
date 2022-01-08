import { RootState } from "../../../redux";
import { useAuthActions } from "../../internal";
import { useSelector } from "react-redux";

export const useAuthenticationService = () => {
  const auth = useSelector((state: RootState) => state.auth);
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
