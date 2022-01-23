import { useMediaQuery } from "@mui/material";
import { getDay } from "date-fns";
import { useMemo } from "react";
import { useSelector } from "../redux/hooks/use-selector";
import { getView } from "../utils/get-view-details";
import { useAvailableView } from "./use-available-views";

const setViewId = (
  userViewId: number,
  responsiveViewId: number,
  matchesMinWidth900: boolean,
  matchesMinWidth1200: boolean
) => {
  if (matchesMinWidth1200) {
    return userViewId;
  } else if (matchesMinWidth900) {
    return userViewId > 1 ? responsiveViewId : userViewId;
  } else {
    return userViewId > 0 ? 0 : responsiveViewId;
  }
};

export const useView = () => {
  const { userView, selectedDate, responsiveView } = useSelector(
    (state) => state.view
  );
  const availableViews = useAvailableView();
  const matchesMinWidth900 = true;
  const matchesMinWidth1200 = true;

  // const matchesMinWidth900 = useMediaQuery("(min-width:900px)");
  // const matchesMinWidth1200 = useMediaQuery("(min-width:1200px)");

  return useMemo(() => {
    return {
      ...getView(
        responsiveView.viewId !== null
          ? responsiveView.viewId
          : userView.viewId,
        // setViewId(
        //   userView.viewId,
        //   availableViews[availableViews.length - 1],
        //   matchesMinWidth900,
        //   matchesMinWidth1200
        // ),
        getDay(selectedDate)
      ),
      selectedDate,
    };
  }, [
    userView,
    responsiveView,
    selectedDate,
    matchesMinWidth900,
    matchesMinWidth1200,
    availableViews,
  ]);
};
