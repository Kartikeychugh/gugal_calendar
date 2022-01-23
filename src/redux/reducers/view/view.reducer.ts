import startOfToday from "date-fns/startOfToday";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export interface ICalendarViewState {
  userView: { viewId: number };
  responsiveView: { viewId: number | null };
  selectedDate: number;
}

const INITIAL_STATE: ICalendarViewState = {
  userView: { viewId: 1 },
  responsiveView: { viewId: null },
  selectedDate: startOfToday().valueOf(),
};

const _CalendarViewReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: number;
  }
): ICalendarViewState => {
  switch (action.type) {
    case "SET_USER_VIEW":
      return {
        ...state,
        userView: { viewId: action.payload },
      };
    case "SET_RESPONSIVE_VIEW":
      return {
        ...state,
        responsiveView: { viewId: action.payload },
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      return state;
  }
};

const config = {
  key: "view",
  whitelist: ["userView"],
  storage,
};

export const CalendarViewReducer = persistReducer(config, _CalendarViewReducer);
