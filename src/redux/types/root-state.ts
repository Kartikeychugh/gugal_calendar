import { ICalendarColorsState } from "../reducers/colors/colors.reducer";
import { IEventsState } from "../reducers/events/events.reducer";
import { ICalendarNotificationsState } from "../reducers/notifications/notifications.reducer";
import { ICalendarSurfaceViewState } from "../reducers/view/view.reducer";

export interface IRootState {
  view: ICalendarSurfaceViewState;
  events: IEventsState;
  notification: ICalendarNotificationsState;
  colors: ICalendarColorsState;
}
