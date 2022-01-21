import { startOfToday, startOfWeek, subDays } from "date-fns";

const INITIAL_STATE: ICalendarWindowState = {
  start: subDays(startOfWeek(startOfToday()), 0).valueOf(),
};

export interface ICalendarWindowState {
  start: number;
}

export const CalendarWindowReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case "SET_WINDOW":
      return { ...state, start: action.payload };
    default:
      return state;
  }
};
