import { put, takeLeading } from "redux-saga/effects";
import { IGoogleCalendarService } from "../../../gapi/services/calendar.service";

export const initFirebaseGAPISaga = (
  googleCalendarService: IGoogleCalendarService
) => {
  function* fetchCalendarEvents(action: {
    type: string;
    payload: { datetime: number };
  }) {
    const result: CalendarEventItem[] = yield googleCalendarService.getEvents();
    localStorage.setItem("calendarEvents", JSON.stringify(result));

    yield put({ type: "SET_EVENTS", payload: result });
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
