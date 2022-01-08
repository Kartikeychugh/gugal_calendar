import { User } from "firebase/auth";

export const getAuthActions = () => {
  return {
    addUser: (user: User | null) => {
      return {
        type: "ADD_USER",
        payload: user,
      };
    },
    signIn: () => {
      return {
        type: "SIGN_IN",
      };
    },
  };
};
