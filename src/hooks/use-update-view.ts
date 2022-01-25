import { useCallback } from "react";
import { useDispatch } from "../redux";

export const useUpdateView = () => {
  const dispatch = useDispatch();

  return useCallback(
    (newViewId: number) => {
      dispatch({
        type: "SET_USER_VIEW",
        payload: newViewId,
      });
    },
    [dispatch]
  );
};
