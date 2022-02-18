import { PropsWithChildren } from "react";
import { ICalendarFeatureFlags } from "../../models";
import { CalendarFeatureFlagsContext } from "./calendar-feature-flags.context";

export const CalendarFeatureFlagsProvider = (
  props: PropsWithChildren<{
    hideCommandBar?: boolean;
    responsiveCellHeight?: boolean;
  }>
) => {
  return (
    <CalendarFeatureFlagsContext.Provider value={{ ...props }}>
      {props.children}
    </CalendarFeatureFlagsContext.Provider>
  );
};
