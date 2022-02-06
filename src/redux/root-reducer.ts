import { combineReducers } from "redux";
import {
  CalendarColorsReducer,
  CalendarEventsReducer,
  CalendarNotificationsReducer,
  CalendarViewReducer,
  CalendarSchedulingFormReducer,
} from "./reducers";

export const rootReducer = combineReducers<any, any>({
  view: CalendarViewReducer,
  events: CalendarEventsReducer,
  notification: CalendarNotificationsReducer,
  colors: CalendarColorsReducer,
  form: CalendarSchedulingFormReducer,
});
