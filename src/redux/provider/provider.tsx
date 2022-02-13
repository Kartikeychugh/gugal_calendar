import { PropsWithChildren, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleCalendarService } from "../../services";
import { GoogleGAPIService } from "../../services/google-client-service/google-client-service";
import { createReduxStore } from "../create-store";
import { CalendarReduxContext } from "./context";

export const CalendarReduxProvider = (props: PropsWithChildren<{}>) => {
  const googleGapiService = useMemo(() => new GoogleGAPIService(), []);
  useEffect(() => {
    googleGapiService.initialise();
  }, [googleGapiService]);
  const { store, persistor } = useMemo(
    () => createReduxStore(new GoogleCalendarService(googleGapiService)),
    [googleGapiService]
  );
  return (
    <Provider context={CalendarReduxContext} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
