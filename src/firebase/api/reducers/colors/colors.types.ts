import { Action, Reducer } from "../../../redux";

export interface CalendarColorsState {
  colors: CalendarColors | undefined;
}
export type CalendarColorsActionPayload = CalendarColors;
export type CalendarColorsActionType = "CACHE_CALENDAR_COLORS";
export type CalendarColorsReducer = Reducer<
  CalendarColorsState,
  Action<CalendarColorsActionType, CalendarColorsActionPayload>
>;
