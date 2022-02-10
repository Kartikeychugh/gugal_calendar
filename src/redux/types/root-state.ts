import {
  ICalendarColorsState,
  IEventsState,
  ICalendarSurfaceViewState,
  ICalendarNotificationsState,
  ICalendarSchedulingFormDialogState,
} from "../reducers";

export interface IRootState {
  view: ICalendarSurfaceViewState;
  events: IEventsState;
  notification: ICalendarNotificationsState;
  colors: ICalendarColorsState;
  form: ICalendarSchedulingFormDialogState;
}
