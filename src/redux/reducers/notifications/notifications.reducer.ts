export interface ICalendarNotificationsState {
  message: string;
}

const INITIAL_STATE: ICalendarNotificationsState = {
  message: "",
};

export const CalendarNotificationsReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: number }
): ICalendarNotificationsState => {
  switch (action.type) {
    case "GOOGLE_SYNC_START":
      return { ...state, message: "Syncing with Google..." };
    case "GOOGLE_SYNC_SUCCESS":
      return { ...state, message: "" };
    default:
      return state;
  }
};
