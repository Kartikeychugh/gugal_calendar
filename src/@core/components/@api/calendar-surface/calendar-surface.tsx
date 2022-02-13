import { ICalendarEvent, ICalendarFeatureFlags } from "../../../models";
import {
  CalendarEventsDetailsProvider,
  CalendarDimensionCellHeightProvider,
  CalendarFeatureFlagsProvider,
} from "../../../providers";
import { CalendarViewProvider } from "../../../providers/calendar-view";
import { CalendarDateProvider } from "../../../providers/calendar-date";
import { CalendarSurfaceRenderer } from "../../@internal";

export const CalendarSurface = (props: {
  events: ICalendarEvent[];
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  userViewId: number;
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
  minCellHeight: number;
  minColumnWidth: number;
  featureFlags?: ICalendarFeatureFlags;
  onViewChange?: (newViewId: number) => void;
}) => {
  const {
    events,
    userViewId,
    selectedDate,
    setSelectedDate,
    onHeaderClick,
    onCellClick,
    featureFlags,
    minColumnWidth,
    minCellHeight,
    onViewChange,
  } = props;

  return (
    <CalendarFeatureFlagsProvider flags={featureFlags || {}}>
      <CalendarEventsDetailsProvider events={events}>
        <CalendarDateProvider
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        >
          <CalendarViewProvider
            minColumnWidth={minColumnWidth}
            userViewId={userViewId}
            onViewChange={onViewChange}
          >
            <CalendarDimensionCellHeightProvider minCellHeight={minCellHeight}>
              <div style={{ width: "100%", height: "100%" }}>
                <CalendarSurfaceRenderer
                  onCellClick={onCellClick}
                  onHeaderClick={onHeaderClick}
                />
              </div>
            </CalendarDimensionCellHeightProvider>
          </CalendarViewProvider>
        </CalendarDateProvider>
      </CalendarEventsDetailsProvider>
    </CalendarFeatureFlagsProvider>
  );
};
