import { User } from "@firebase/auth";

export interface IFirebaseAuthManager {
  initialise: () => void;
  getAuthActions: () => {
    addUser: (_user: User | null) => never;
    signIn: () => never;
  };
}

export const FirebaseAuthManager = (): IFirebaseAuthManager => {
  let authActions = {
    addUser: (_user: User | null) => {
      throw new Error(
        "Please ensure FirebaseAuthLayer is wrapped in your application"
      );
    },
    signIn: () => {
      throw new Error(
        "Please ensure FirebaseAuthLayer is wrapped in your application"
      );
    },
  };

  return {
    initialise: () => {
      authActions = {
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
        test: () => {},
      } as any;
    },
    getAuthActions: () => authActions,
  };
};
