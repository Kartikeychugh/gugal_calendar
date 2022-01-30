import { useEffect } from "react";
import { useDispatch, useSelector } from "../redux";

export const useCalendarColors = () => {
  const dispatch = useDispatch();
  const { colorDetails } = useSelector((state) => state.colors);

  useEffect(() => {
    if (!colorDetails) {
      dispatch({ type: "FETCH_CALENDAR_COLORS" });
    }
  }, [dispatch, colorDetails]);

  return colorDetails;
};
