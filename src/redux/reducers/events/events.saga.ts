import { put, takeLeading } from "redux-saga/effects";
import { IGoogleCalendarService } from "../../../gapi/services/calendar.service";

export const initFirebaseGAPISaga = (
  googleCalendarService: IGoogleCalendarService
) => {
  function* fetchCalendarEvents() {
    yield put({ type: "GOOGLE_SYNC_START" });
    const result: CalendarEventItem[] = yield googleCalendarService.getEvents();
    localStorage.setItem("calendarEvents", JSON.stringify(result));
    yield put({ type: "SET_EVENTS", payload: result });
    yield put({ type: "GOOGLE_SYNC_SUCCESS" });
  }

  function* watchFetchCalendarEvents() {
    yield takeLeading("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
  }

  //   function* hydrateCalendarEvents() {
  //     const result = localStorage.getItem("calendarEvents");
  //     if (result) {
  //       yield put({ type: "CACHE_CALENDAR_EVENTS", payload: JSON.parse(result) });
  //     }
  //   }

  //   function* watchHydrateCalendarEvents() {
  //     yield takeLeading("REHYDRATE_CALENDAR_EVENTS", hydrateCalendarEvents);
  //   }

  return [watchFetchCalendarEvents()];
};
