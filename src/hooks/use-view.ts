import { useMediaQuery } from "@mui/material";
import { getDay } from "date-fns";
import { useMemo } from "react";
import { useSelector } from "../redux/hooks/use-selector";
import { getView } from "../utils/get-view-details";

const setViewId = (
  userViewId: number,
  matchesMinWidth900: boolean,
  matchesMinWidth1200: boolean
) => {
  if (matchesMinWidth1200) {
    return userViewId;
  } else if (matchesMinWidth900) {
    return userViewId > 1 ? 1 : userViewId;
  } else {
    return userViewId > 0 ? 0 : userViewId;
  }
};

export const useView = () => {
  const { userView, selectedDate } = useSelector((state) => state.view);
  const matchesMinWidth900 = useMediaQuery("(min-width:900px)");
  const matchesMinWidth1200 = useMediaQuery("(min-width:1200px)");

  return useMemo(() => {
    return {
      ...getView(
        setViewId(userView.viewId, matchesMinWidth900, matchesMinWidth1200),
        getDay(selectedDate)
      ),
      selectedDate,
    };
  }, [userView, selectedDate, matchesMinWidth900, matchesMinWidth1200]);
};
