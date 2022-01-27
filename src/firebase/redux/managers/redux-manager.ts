import {
  CombinedState,
  Store,
  applyMiddleware,
  createStore,
  combineReducers,
} from "redux";
import { RootAction, RootState } from "../types";
import createSagaMiddleware, { Saga, SagaMiddleware } from "redux-saga";
import { createFirebaseErrorObj } from "../../utils";
import { authDetailsReducer } from "../../auth/reducers";

export type StoreType = Store<CombinedState<RootState>, RootAction> & {
  dispatch: unknown;
};

export interface IFirebaseReduxManager {
  initialise: () => void;
  getStore: () => StoreType;
  addSaga: (saga: Saga) => void;
}

const uninitializedFn = () => {
  throw createFirebaseErrorObj(
    "FirebaseReduxManager_uninitialised",
    "Please ensure FirebaseReduxManager is initialised"
  );
};

export const FirebaseReduxManager = (): IFirebaseReduxManager => {
  let store: any;
  let sagaMiddleware: SagaMiddleware<object>;
  let addSaga: IFirebaseReduxManager["addSaga"] = uninitializedFn;
  let getStore: IFirebaseReduxManager["getStore"] = uninitializedFn;

  return {
    initialise: () => {
      sagaMiddleware = createSagaMiddleware();
      store = createStore(
        combineReducers({
          auth: authDetailsReducer,
        }),
        applyMiddleware(sagaMiddleware)
      );
      getStore = () => store;
      addSaga = (saga: Saga) => {
        sagaMiddleware.run(saga);
      };
    },
    getStore,
    addSaga: (saga: Saga) => addSaga(saga),
  };
};
