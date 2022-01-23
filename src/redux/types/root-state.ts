import { ICalendarColorsState } from "../reducers/colors/colors.reducer";
import { IEventsState } from "../reducers/events/events.reducer";
import { ICalendarNotificationsState } from "../reducers/notifications/notifications.reducer";
import { ICalendarViewState } from "../reducers/view/view.reducer";

export interface IRootState {
  view: ICalendarViewState;
  events: IEventsState;
  notification: ICalendarNotificationsState;
  colors: ICalendarColorsState;
}
