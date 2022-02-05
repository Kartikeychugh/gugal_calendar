import { PropsWithChildren, useEffect } from "react";
import { useFirebaseUser } from "../../firebase";
import { LoadingScreen } from "../loading-screen";

export const PrivateRoute = (props: PropsWithChildren<{}>) => {
  const { user, dispatch: userDispatch } = useFirebaseUser();

  useEffect(() => {
    if (user === null) {
      userDispatch({ type: "GOOGLE_SIGN_IN" });
    }
  }, [user, userDispatch]);

  return (
    <>
      {!user ? <LoadingScreen /> : null}
      {props.children}
    </>
  );
};
