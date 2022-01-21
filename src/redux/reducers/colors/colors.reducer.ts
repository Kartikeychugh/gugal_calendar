const INITIAL_STATE: CalendarColors | null = null;

export const CalendarColorsReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: CalendarColors;
  }
) => {
  switch (action.type) {
    case "SET_COLORS":
      return action.payload;
    default:
      return state;
  }
};
