import { PropsWithChildren } from "react";
import { ICalendarFeatureFlags } from "../../models";
import { CalendarFeatureFlagsContext } from "./calendar-feature-flags.context";

export const CalendarFeatureFlagsProvider = (
  props: PropsWithChildren<{ flags: ICalendarFeatureFlags }>
) => {
  const { flags } = props;
  return (
    <CalendarFeatureFlagsContext.Provider value={{ ...flags }}>
      {props.children}
    </CalendarFeatureFlagsContext.Provider>
  );
};
