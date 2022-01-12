import { all, put, takeEvery, takeLeading } from "redux-saga/effects";
import { IFirebaseGAPIService } from "../services/firebase-gapi.service";

export const initFirebaseGAPISaga = (
  firebaseGAPIService: IFirebaseGAPIService
) => {
  function* fetchCalendarEvents(action: {
    type: string;
    payload: { datetime: number };
  }) {
    const result: CalendarEventItem[] = yield firebaseGAPIService.getEvents();
    localStorage.setItem("calendarEvents", JSON.stringify(result));

    yield put({ type: "CACHE_CALENDAR_EVENTS", payload: result });
  }

  function* watchFetchCalendarEvents() {
    yield takeEvery("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
  }

  function* hydrateCalendarEvents() {
    const result = localStorage.getItem("calendarEvents");
    if (result) {
      yield put({ type: "CACHE_CALENDAR_EVENTS", payload: JSON.parse(result) });
    }
  }

  function* watchHydrateCalendarEvents() {
    yield takeLeading("REHYDRATE_CALENDAR_EVENTS", hydrateCalendarEvents);
  }

  function* rootSaga() {
    yield all([watchFetchCalendarEvents(), watchHydrateCalendarEvents()]);
  }

  return rootSaga;
};

export const initCalendarColorsSaga = (
  firebaseGAPIService: IFirebaseGAPIService
) => {
  function* fetchColors() {
    const result: CalendarColors = yield firebaseGAPIService.getColors();
    localStorage.setItem("calendarColors", JSON.stringify(result));
    yield put({ type: "CACHE_CALENDAR_COLORS", payload: result });
  }

  function* watchFetchColors() {
    yield takeLeading("FETCH_CALENDAR_COLORS", fetchColors);
  }

  function* rehydrateColors() {
    const result = localStorage.getItem("calendarColors");
    if (result) {
      yield put({ type: "CACHE_CALENDAR_COLORS", payload: JSON.parse(result) });
    }
  }

  function* watchRehydrateColors() {
    yield takeLeading("REHYDRATE_CALENDAR_COLORS", rehydrateColors);
  }

  function* rootSaga() {
    yield all([watchFetchColors(), watchRehydrateColors()]);
  }

  return rootSaga;
};
