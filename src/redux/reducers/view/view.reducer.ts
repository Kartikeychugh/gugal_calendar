import startOfToday from "date-fns/startOfToday";
import { getView } from "../../../utils/get-view-details";

export interface ICalendarViewState {
  fromDay: number;
  numberOfDays: number;
  title: string;
  change: number;
  pointer: number;
  viewId: number;
}

const INITIAL_STATE: ICalendarViewState = getView(1, startOfToday().getDay());

export const CalendarViewReducer = (
  state = INITIAL_STATE,
  action: {
    type: string;
    payload: ICalendarViewState;
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
