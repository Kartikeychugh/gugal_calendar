import { PropsWithChildren } from "react";
import { useAuthenticationService } from "../../firebase/auth";

export const PrivateRoute = (props: PropsWithChildren<{}>) => {
  const { getUser, signIn } = useAuthenticationService();
  const user = getUser();

  if (user === undefined) {
    return <div>Looking for user</div>;
  } else if (user === null) {
    signIn();
    return <div>Looking for user</div>;
  } else {
    return <>{props.children}</>;
  }
};
