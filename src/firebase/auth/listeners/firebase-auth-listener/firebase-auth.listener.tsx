import { PropsWithChildren, useContext, useEffect } from "react";

import { FirebaseAuthContext } from "../../context";
import { useAuthActions } from "../../reducers";

export const FirebaseAuthListener = (props: PropsWithChildren<{}>) => {
  const { firebaseAuth } = useContext(FirebaseAuthContext);
  const { addUser } = useAuthActions();

  useEffect(() => {
    firebaseAuth!.onAuthStateChanged((user) => {
      addUser(user);
    });
  }, [firebaseAuth, addUser]);

  return <>{props.children}</>;
};
