import { getWorkWeek } from "../../../utils/get-current-week-dates";

export interface ICalendarViewState {
  dates: string[];
  title: string;
}

const INITIAL_STATE: ICalendarViewState = {
  dates: getWorkWeek(5),
  title: "Week",
};

export const CalendarViewReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: {
      dates: string[];
    };
  }
): ICalendarViewState => {
  switch (action.type) {
    case "SET_VIEW":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
