import {
  CombinedState,
  Store,
  applyMiddleware,
  createStore,
  combineReducers,
} from "redux";
import { Reducer, RootAction, RootState } from "../types";
import createSagaMiddleware, { Saga, SagaMiddleware } from "redux-saga";

export type StoreType = Store<
  CombinedState<{} | RootState> & {},
  RootAction
> & {
  dispatch: unknown;
};

export interface IFirebaseReduxManager {
  initialise: () => void;
  getStore: () => StoreType;
  addReducer: (key: string, reducer: Reducer<any, any>) => void;
  addSaga: (saga: Saga) => void;
  reduce: (
    state: CombinedState<{} | RootState> | undefined,
    action: RootAction
  ) => CombinedState<{} | RootState>;
}

export const FirebaseReduxManager = (): IFirebaseReduxManager => {
  let store: StoreType;
  let sagaMiddleware: SagaMiddleware<object>;
  let reducers: { [key: string]: Reducer<any, any> } = {};

  let combinedReducers = combineReducers<RootState | {}>({
    ...reducers,
  });

  const reduce = (
    state: CombinedState<{} | RootState> | undefined,
    action: RootAction
  ) => {
    return combinedReducers(state, action);
  };

  const addReducer = (key: string, reducer: Reducer<any, any>) => {
    if (!key || reducers[key]) {
      return;
    }

    reducers[key] = reducer;
    combinedReducers = combineReducers({
      ...reducers,
    });
  };

  const addSaga = (saga: Saga) => {
    sagaMiddleware.run(saga);
  };

  const getStore = () => store;

  return {
    initialise: () => {
      sagaMiddleware = createSagaMiddleware();
      store = createStore(reduce, applyMiddleware(sagaMiddleware));
    },
    getStore,
    addSaga,
    reduce,
    addReducer,
  };
};
