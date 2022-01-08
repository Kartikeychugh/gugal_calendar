import { CombinedState, Store, applyMiddleware, createStore } from "redux";
import { Reducer, RootAction, RootState } from "./reducers/root.types";
import createSagaMiddleware, { Saga, Task } from "redux-saga";

import { ReducerManager } from "./reducer-manager";

export type StoreType = Store<
  CombinedState<{} | RootState> & {},
  RootAction
> & {
  dispatch: unknown;
} & {
  addReducer: (key: string, reducer: Reducer<any, any>) => void;
  addSaga: (saga: Saga) => Task;
};

export const createReduxStore = (): StoreType => {
  const reducerManager = ReducerManager();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducerManager.reduce,
    applyMiddleware(sagaMiddleware)
  );

  return {
    ...store,
    addReducer: reducerManager.add,
    addSaga: sagaMiddleware.run,
  };
};
