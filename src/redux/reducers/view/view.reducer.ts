export interface ICalendarViewState {
  numberOfDays: number;
}

const INITIAL_STATE: ICalendarViewState = {
  numberOfDays: 5,
};

export const CalendarViewReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: number }
): ICalendarViewState => {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, numberOfDays: action.payload };
    default:
      return state;
  }
};
