import { getWorkWeek } from "../../../utils/get-current-week-dates";

export interface ICalendarViewState {
  numberOfDays: number;
  daysToView: string[];
}

const INITIAL_STATE: ICalendarViewState = {
  numberOfDays: 5,
  daysToView: getWorkWeek(5),
};

export const CalendarViewReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: number | string[] }
): ICalendarViewState => {
  switch (action.type) {
    case "SET_NUMBER_OF_DAYS":
      return { ...state, numberOfDays: action.payload as number };
    case "SET_VIEW":
      return {
        ...state,
        daysToView: action.payload as string[],
        numberOfDays: (action.payload as string[]).length,
      };
    default:
      return state;
  }
};
