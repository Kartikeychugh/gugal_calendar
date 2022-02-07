export interface ICalendarSchedulingFormDialogState {
  open: boolean;
}
const INITIAL_STATE: ICalendarSchedulingFormDialogState = {
  open: false,
};

export const CalendarSchedulingFormReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: boolean;
  }
) => {
  switch (action.type) {
    case "SET_FORM_OPEN":
      return { ...state, open: action.payload };
    default:
      return state;
  }
};
