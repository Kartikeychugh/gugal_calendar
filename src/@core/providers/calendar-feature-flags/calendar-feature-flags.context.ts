import React from "react";
import { ICalendarFeatureFlags } from "../../models";

export const CalendarFeatureFlagsContext =
  React.createContext<ICalendarFeatureFlags>({
    hideCommandBar: undefined,
    responsiveCellHeight: undefined,
  });
