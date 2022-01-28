import { createContext } from "react";
import { User } from "@firebase/auth";

export interface IFirebaseUser {
  user: User | null | undefined;
  dispatch: React.Dispatch<{
    type: string;
    payload?: IFirebaseUser["user"];
  }>;
}

export const FirebaseUserContext = createContext<IFirebaseUser>(undefined!);
