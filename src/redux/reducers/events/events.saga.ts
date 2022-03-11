import { put, takeLeading } from "redux-saga/effects";
import { ICalendarClientEventItem, ICalendarEventItem } from "../../../@core";
import { IGoogleCalendarService } from "../../../services";
import { getViewKey } from "../../../utils";

export const initFirebaseGAPISaga = (
  googleCalendarService: IGoogleCalendarService
) => {
  function* fetchCalendarEvents(action: {
    type: string;
    payload: { start: number };
  }) {
    try {
      yield put({ type: "GOOGLE_SYNC_START" });
      const result: CalendarEventItem[] = yield googleCalendarService.getEvents(
        action.payload.start
      );

      yield put({
        type: "SET_BACKEND_EVENTS",
        payload: { [getViewKey(action.payload.start)]: result },
      });

      yield put({ type: "GOOGLE_SYNC_SUCCESS" });
    } catch (e) {
      console.error(e);
    }
  }

  function* watchFetchCalendarEvents() {
    yield takeLeading("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
  }

  function* insertCalendarEvents(action: {
    type: string;
    payload: ICalendarClientEventItem;
  }) {
    try {
      const result: ICalendarEventItem =
        yield googleCalendarService.createEvent(action.payload);

      yield put({ type: "ADD_BACKEND_EVENT", payload: result });

      yield put({
        type: "REMOVE_CLIENT_EVENT",
      });
    } catch (e) {
      console.error(e);
    }
  }

  function* watchInsertCalendarEvents() {
    yield takeLeading("CREATE_CALENDAR_EVENTS", insertCalendarEvents);
  }

  function* fetchCalendarColors() {
    const result: CalendarColors = yield googleCalendarService.getColors();

    try {
      yield put({
        type: "SET_COLORS",
        payload: result,
      });
    } catch (e) {
      console.error(e);
    }
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
