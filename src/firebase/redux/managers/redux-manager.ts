import {
  CombinedState,
  Store,
  applyMiddleware,
  createStore,
  combineReducers,
} from "redux";
import { AnyFirebaseReduxReducer, RootAction, RootState } from "../types";
import createSagaMiddleware, { Saga, SagaMiddleware } from "redux-saga";
import { createFirebaseErrorObj } from "../../utils";
import { Reducer } from "react";

export type StoreType = Store<CombinedState<RootState>, RootAction> & {
  dispatch: unknown;
};

export interface IFirebaseReduxManager {
  initialise: () => void;
  getStore: () => StoreType;
  addReducer: (key: string, reducer: AnyFirebaseReduxReducer) => void;
  addSaga: (saga: Saga) => void;
  reduce: Reducer<any, any>;
}

const uninitializedFn = () => {
  throw createFirebaseErrorObj(
    "FirebaseReduxManager_uninitialised",
    "Please ensure FirebaseReduxManager is initialised"
  );
};

export const FirebaseReduxManager = (): IFirebaseReduxManager => {
  let store: StoreType;
  let sagaMiddleware: SagaMiddleware<object>;
  let reducers: { [key: string]: AnyFirebaseReduxReducer } = {};
  let combinedReducers: any;

  let reduce: IFirebaseReduxManager["reduce"] = uninitializedFn;
  let addReducer: IFirebaseReduxManager["addReducer"] = uninitializedFn;
  let addSaga: IFirebaseReduxManager["addSaga"] = uninitializedFn;
  let getStore: IFirebaseReduxManager["getStore"] = uninitializedFn;

  return {
    initialise: () => {
      sagaMiddleware = createSagaMiddleware();
      combinedReducers = combineReducers({
        ...reducers,
      });
      reduce = (state: CombinedState<RootState>, action: RootAction) => {
        return combinedReducers(state, action);
      };
      store = createStore(reduce, applyMiddleware(sagaMiddleware));
      getStore = () => store;
      addSaga = (saga: Saga) => {
        sagaMiddleware.run(saga);
      };
      addReducer = (key: string, reducer: AnyFirebaseReduxReducer) => {
        if (!key || reducers[key]) {
          return;
        }

        reducers[key] = reducer;
        combinedReducers = combineReducers({
          ...reducers,
        });
      };
    },
    getStore: () => getStore(),
    addSaga: (saga: Saga) => addSaga(saga),
    reduce: (state: CombinedState<RootState>, action: RootAction) =>
      reduce(state, action),
    addReducer: (key: string, reducer: AnyFirebaseReduxReducer) =>
      addReducer(key, reducer),
  };
};
