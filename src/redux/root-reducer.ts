import { combineReducers } from "redux";
import { CalendarColorsReducer } from "./reducers/colors/colors.reducer";
import { CalendarEventsReducer } from "./reducers/events/events.reducer";
import { CalendarNotificationsReducer } from "./reducers/notifications/notifications.reducer";
import { CalendarViewReducer } from "./reducers/view/view.reducer";
import { CalendarWindowReducer } from "./reducers/window/window.reducer";

export const rootReducer = combineReducers<any, any>({
  view: CalendarViewReducer,
  events: CalendarEventsReducer,
  notification: CalendarNotificationsReducer,
  window: CalendarWindowReducer,
  colors: CalendarColorsReducer,
});
