import { StoreType } from "../redux/store";
import { useStore } from "react-redux";

export const useFirebaseReduxStore = () => {
  const store = useStore();
  return store as unknown as StoreType;
};
