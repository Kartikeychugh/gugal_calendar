import { put, takeLeading } from "redux-saga/effects";
import { IFirebaseGAPIService } from "../services/firebase-gapi.service";

export const initFirebaseGAPISaga = (
  firebaseGAPIService: IFirebaseGAPIService
) => {
  function* fetchCalendarEvents() {
    const today = new Date();
    const lastDayOfTheWeek = new Date();
    lastDayOfTheWeek.setDate(lastDayOfTheWeek.getDate() + 7);

    const items: CalendarEventItem[] = yield firebaseGAPIService.getEvents(
      today.toISOString(),
      lastDayOfTheWeek.toISOString()
    );
    yield put({ type: "SET_CALENDAR_EVENTS", payload: items });
  }

  function* watchFetchCalendarEvents() {
    yield takeLeading("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
  }

  return watchFetchCalendarEvents;
};
