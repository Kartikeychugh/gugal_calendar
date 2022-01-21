import { Backdrop, CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";
import { useAuthenticationCommands } from "../../firebase/auth";

export const PrivateRoute = (props: PropsWithChildren<{}>) => {
  const { getUser, signIn } = useAuthenticationCommands();
  const user = getUser();

  if (!user) {
    if (user === null) {
      signIn();
    }
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return <>{props.children}</>;
  }
};
