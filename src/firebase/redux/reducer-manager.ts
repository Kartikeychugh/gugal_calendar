import { CombinedState, combineReducers } from "redux";
import { Reducer, RootAction, RootState } from "./reducers/root.types";

export const ReducerManager = () => {
  let reducers: { [key: string]: Reducer<any, any> } = {};

  let combinedReducers = combineReducers<RootState | {}>({
    ...reducers,
  });

  return {
    reduce: (
      state: CombinedState<{} | RootState> | undefined,
      action: RootAction
    ) => {
      return combinedReducers(state, action);
    },
    add: (key: string, reducer: Reducer<any, any>) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      combinedReducers = combineReducers({
        ...reducers,
      });
    },
  };
};
