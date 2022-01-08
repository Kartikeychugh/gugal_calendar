import { PropsWithChildren, useEffect } from "react";

import { useAuthenticationServiceInternal } from "../../effects";
import { useFirebase } from "../../../../index";

export const FirebaseAuthListener = (props: PropsWithChildren<{}>) => {
  const { firebaseAuth } = useFirebase();
  const { addUser } = useAuthenticationServiceInternal();

  useEffect(() => {
    firebaseAuth &&
      firebaseAuth.onAuthStateChanged((user) => {
        addUser(user);
      });
  }, [firebaseAuth, addUser]);

  return <>{props.children}</>;
};
