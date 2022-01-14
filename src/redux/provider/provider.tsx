import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleCalendarService } from "../../gapi/services/calendar.service";
import { createReduxStore } from "../create-store";
import { CalendarReduxContext } from "./context";

export const CalendarReduxProvider = (props: PropsWithChildren<{}>) => {
  const { store, persistor } = createReduxStore(new GoogleCalendarService());
  return (
    <Provider context={CalendarReduxContext} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
