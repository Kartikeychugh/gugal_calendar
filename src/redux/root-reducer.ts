import { combineReducers } from "redux";
import {
  CalendarColorsReducer,
  CalendarEventsReducer,
  CalendarNotificationsReducer,
  CalendarViewReducer,
} from "./reducers";

export const rootReducer = combineReducers<any, any>({
  view: CalendarViewReducer,
  events: CalendarEventsReducer,
  notification: CalendarNotificationsReducer,
  colors: CalendarColorsReducer,
});
