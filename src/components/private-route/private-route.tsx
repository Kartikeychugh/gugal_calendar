import { PropsWithChildren } from "react";
import { useAuthenticationCommands } from "../../firebase";
import { LoadingScreen } from "../loading-screen";

export const PrivateRoute = (props: PropsWithChildren<{}>) => {
  const { getUser, signIn } = useAuthenticationCommands();
  const user = getUser();

  if (!user) {
    if (user === null) {
      signIn();
    }
    return <LoadingScreen />;
  } else {
    return <>{props.children}</>;
  }
};
