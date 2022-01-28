import { PropsWithChildren } from "react";
import { useUser } from "../../firebase/auth/context/firebase-user.context";
import { LoadingScreen } from "../loading-screen";

export const PrivateRoute = (props: PropsWithChildren<{}>) => {
  const { user, dispatch: userDispatch } = useUser();

  if (!user) {
    if (user === null) {
      userDispatch({ type: "GOOGLE_SIGN_IN" });
    }
    return <LoadingScreen />;
  } else {
    return <>{props.children}</>;
  }
};
