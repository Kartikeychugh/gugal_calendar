import { put, takeLeading } from "redux-saga/effects";
import { IGoogleCalendarService } from "../../../services";
import { ICalendarClientEvent } from "../../../models";
import { getViewKey } from "../../../utils";

export const initFirebaseGAPISaga = (
  googleCalendarService: IGoogleCalendarService
) => {
  function* fetchCalendarEvents(action: {
    type: string;
    payload: { start: number; removeClient?: boolean };
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

  function* insertCalendarEvents(action: {
    type: string;
    payload: ICalendarClientEvent;
  }) {
    const result: {} = yield googleCalendarService.createEvent(action.payload);

    yield put({
      type: "REMOVE_CLIENT_EVENT",
    });

    yield put({
      type: "FETCH_CALENDAR_EVENTS",
      payload: { start: new Date(action.payload.start.dateTime).valueOf() },
    });

    console.log({ result });
  }

  function* watchInsertCalendarEvents() {
    yield takeLeading("CREATE_CALENDAR_EVENTS", insertCalendarEvents);
  }

  function* fetchCalendarColors() {
    const result: CalendarColors = yield googleCalendarService.getColors();

    yield put({
      type: "SET_COLORS",
      payload: result,
    });
  }

  function* watchFetchCalendarColors() {
    yield takeLeading("FETCH_CALENDAR_COLORS", fetchCalendarColors);
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

  return [
    watchFetchCalendarEvents(),
    watchInsertCalendarEvents(),
    watchFetchCalendarColors(),
  ];
};
