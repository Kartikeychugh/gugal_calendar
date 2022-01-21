import { useCallback } from "react";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";
import { getView } from "../utils/get-view-details";

export const useUpdateView = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view);

  return useCallback(
    (pointer: number, viewId?: number) => {
      dispatch({
        type: "SET_VIEW",
        payload: getView(viewId !== undefined ? viewId : view.viewId, pointer),
      });
    },
    [dispatch, view]
  );
};
