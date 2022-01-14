import { combineReducers } from "redux";
import { CalendarEventsReducer } from "./reducers/events/events.reducer";
import { CalendarViewReducer } from "./reducers/view/view.reducer";

export const rootReducer = combineReducers({
  view: CalendarViewReducer,
  events: CalendarEventsReducer,
});