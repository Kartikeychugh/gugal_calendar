import { createStore, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { IGoogleCalendarService } from "../gapi/services/calendar.service";
import { initFirebaseGAPISaga } from "./reducers/events/events.saga";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const config = {
  key: "root",
  whitelist: ["view", "events", "colors", "window"],
  storage,
};

export const createReduxStore = (
  googleCalendarService: IGoogleCalendarService
) => {
  const saga = createSagaMiddleware();
  const store = createStore(
    persistReducer(config, rootReducer),
    applyMiddleware(...[saga])
  );
  const persistor = persistStore(store);

  function* rootSaga() {
    yield all([...initFirebaseGAPISaga(googleCalendarService)]);
  }

  saga.run(rootSaga);
  (window as any).store = store;
  return { store, persistor };
};
