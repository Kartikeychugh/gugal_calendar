import {
  ICalendarColorsState,
  IEventsState,
  ICalendarSurfaceViewState,
  ICalendarNotificationsState,
} from "../reducers";

export interface IRootState {
  view: ICalendarSurfaceViewState;
  events: IEventsState;
  notification: ICalendarNotificationsState;
  colors: ICalendarColorsState;
}
