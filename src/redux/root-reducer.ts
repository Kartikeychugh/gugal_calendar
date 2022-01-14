import { combineReducers } from "redux";
import { CalendarEventsReducer } from "./reducers/events/events.reducer";
import { CalendarNotificationsReducer } from "./reducers/notifications/notifications.reducer";
import { CalendarViewReducer } from "./reducers/view/view.reducer";

export const rootReducer = combineReducers<any, any>({
  view: CalendarViewReducer,
  events: CalendarEventsReducer,
  notification: CalendarNotificationsReducer,
});
