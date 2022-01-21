import { put, takeLeading, select } from "redux-saga/effects";
import { IGoogleCalendarService } from "../../../gapi/services/calendar.service";
import { getViewKey } from "../../../utils/get-view-details";

export const initFirebaseGAPISaga = (
  googleCalendarService: IGoogleCalendarService
) => {
  function* fetchCalendarEvents(action: {
    type: string;
    payload: { start: Date; removeClient?: boolean };
  }) {
    yield put({ type: "GOOGLE_SYNC_START" });
    const result: CalendarEventItem[] = yield googleCalendarService.getEvents(
      action.payload.start
    );

    yield put({
      type: "SET_BACKEND_EVENTS",
      payload: { [getViewKey(action.payload.start)]: result },
    });

    if (action.payload.removeClient) {
      yield put({
        type: "REMOVE_CLIENT_EVENT",
      });
    }

    yield put({ type: "GOOGLE_SYNC_SUCCESS" });
  }

  function* watchFetchCalendarEvents() {
    yield takeLeading("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
  }

  function* insertCalendarEvents(action: { type: string; payload: any }) {
    const result: {} = yield googleCalendarService.createEvent(action.payload);
    const state: { window: { start: number } } = yield select();

    yield put({
      type: "FETCH_CALENDAR_EVENTS",
      payload: { start: state.window.start, removeClient: true },
    });

    console.log({ result });
  }

  function* watchInsertCalendarEvents() {
    yield takeLeading("CREATE_CALENDAR_EVENTS", insertCalendarEvents);
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

  return [watchFetchCalendarEvents(), watchInsertCalendarEvents()];
};
