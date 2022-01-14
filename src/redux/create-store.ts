import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { IGoogleCalendarService } from "../gapi/services/calendar.service";
import { initFirebaseGAPISaga } from "./reducers/events/events.saga";
import { rootReducer } from "./root-reducer";

export const createReduxStore = (
  googleCalendarService: IGoogleCalendarService
) => {
  const saga = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(...[saga]));
  function* rootSaga() {
    yield all([...initFirebaseGAPISaga(googleCalendarService)]);
  }

  saga.run(rootSaga);

  return store;
};
