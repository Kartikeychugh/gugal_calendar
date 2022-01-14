import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { GoogleCalendarService } from "../../gapi/services/calendar.service";
import { createReduxStore } from "../create-store";
import { CalendarReduxContext } from "./context";

export const CalendarReduxProvider = (props: PropsWithChildren<{}>) => {
  return (
    <Provider
      context={CalendarReduxContext}
      store={createReduxStore(new GoogleCalendarService())}>
      {props.children}
    </Provider>
  );
};
