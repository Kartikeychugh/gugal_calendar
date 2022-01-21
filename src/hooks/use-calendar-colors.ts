import { useEffect } from "react";
import { useDispatch } from "../redux/hooks/use-dispatch";
import { useSelector } from "../redux/hooks/use-selector";

export const useCalendarColors = (): CalendarColors | null => {
  const dispatch = useDispatch();
  const colorDetails = useSelector((state) => state.colors);

  useEffect(() => {
    console.log(colorDetails);

    if (!colorDetails) {
      dispatch({ type: "FETCH_CALENDAR_COLORS" });
    }
  }, [dispatch, colorDetails]);

  return colorDetails;
};
