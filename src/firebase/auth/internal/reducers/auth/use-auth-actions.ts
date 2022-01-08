import { User } from "firebase/auth";
import { getAuthActions } from "./auth.actions";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const { addUser, signIn } = useMemo(() => getAuthActions(), []);
  return {
    addUser: (user: User | null) => dispatch(addUser(user)),
    signIn: () => {
      dispatch(signIn());
    },
  };
};
