import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export interface ICalendarSurfaceViewState {
  userView: { viewId: number };
}

const INITIAL_STATE: ICalendarSurfaceViewState = {
  userView: { viewId: 0 },
};

const _CalendarViewReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: number;
  }
): ICalendarSurfaceViewState => {
  switch (action.type) {
    case "SET_USER_VIEW":
      return {
        ...state,
        userView: { viewId: action.payload },
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
