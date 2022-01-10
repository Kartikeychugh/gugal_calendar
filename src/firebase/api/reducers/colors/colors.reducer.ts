import { CalendarColorsReducer, CalendarColorsState } from "./colors.types";

const INITIATE_STATE: CalendarColorsState = {
  colors: undefined,
};

export const calendarColorsReducer: CalendarColorsReducer = (
  state = INITIATE_STATE,
  action
) => {
  switch (action.type) {
    case "SET_CALENDAR_COLORS":
      return { ...state, colors: action.payload };
    default:
      return state;
  }
};
