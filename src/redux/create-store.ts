import { createStore, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { IGoogleCalendarService } from "../services";
import { initFirebaseGAPISaga } from "./reducers";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import logger from "redux-logger";

const config = {
  key: "root",
  whitelist: [],
  storage,
};

export const createReduxStore = (
  googleCalendarService: IGoogleCalendarService
) => {
  const saga = createSagaMiddleware();
  const store = createStore(
    persistReducer(config, rootReducer),
    applyMiddleware(...[saga, logger])
  );
  const persistor = persistStore(store);

  function* rootSaga() {
    yield all([...initFirebaseGAPISaga(googleCalendarService)]);
  }

  saga.run(rootSaga);
  return { store, persistor };
};
