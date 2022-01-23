import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export interface ICalendarSurfaceViewState {
  userView: { viewId: number };
  responsiveView: { viewId: number | null };
}

const INITIAL_STATE: ICalendarSurfaceViewState = {
  userView: { viewId: 1 },
  responsiveView: { viewId: null },
};

const _CalendarViewReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: number | number[];
  }
): ICalendarSurfaceViewState => {
  switch (action.type) {
    case "SET_USER_VIEW":
      return {
        ...state,
        userView: { viewId: action.payload as number },
      };
    case "SET_RESPONSIVE_VIEW":
      return {
        ...state,
        responsiveView: { viewId: action.payload as number },
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
