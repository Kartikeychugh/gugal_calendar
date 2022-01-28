import { PropsWithChildren } from "react";
import { useFirebaseUser } from "../../firebase";
import { LoadingScreen } from "../loading-screen";

export const PrivateRoute = (props: PropsWithChildren<{}>) => {
  const { user, dispatch: userDispatch } = useFirebaseUser();

  if (!user) {
    if (user === null) {
      userDispatch({ type: "GOOGLE_SIGN_IN" });
    }
    return <LoadingScreen />;
  } else {
    return <>{props.children}</>;
  }
};
