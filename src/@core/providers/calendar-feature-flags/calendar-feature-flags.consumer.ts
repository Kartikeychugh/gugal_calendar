import { useContext } from "react";
import { CalendarFeatureFlagsContext } from "./calendar-feature-flags.context";

export const useCalendarFeatureFlags = () => {
  return useContext(CalendarFeatureFlagsContext);
};
