import startOfToday from "date-fns/startOfToday";

export interface ICalendarViewState {
  fromDay: number;
  numberOfDays: number;
  title: string;
  change: number;
  pointer: number;
}

const INITIAL_STATE: ICalendarViewState = {
  fromDay: 0,
  numberOfDays: 7,
  title: "Week",
  change: 7,
  pointer: startOfToday().getDay(),
};

export const CalendarViewReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: {
      fromDay: number;
      numberOfDays: number;
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
