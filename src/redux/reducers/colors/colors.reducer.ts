import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface ICalendarColorsState {
  colorDetails: CalendarColors | null;
}
const INITIAL_STATE: ICalendarColorsState = {
  colorDetails: null,
};

const _CalendarColorsReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: CalendarColors;
  }
) => {
  switch (action.type) {
    case "SET_COLORS":
      return { ...state, colorDetails: action.payload };
    default:
      return state;
  }
};

const config = {
  key: "colors",
  storage,
  whitelist: ["colorDetails"],
};

export const CalendarColorsReducer = persistReducer(
  config,
  _CalendarColorsReducer
);
