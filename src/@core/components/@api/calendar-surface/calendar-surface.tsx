import { ICalendarEvent, ICalendarFeatureFlags } from "../../../models";
import {
  CalendarViewProvider,
  CalendarEventsDetailsProvider,
  CalendarDimensionCellHeightProvider,
  CalendarFeatureFlagsProvider,
} from "../../../providers";
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
  } = props;

  return (
    <CalendarFeatureFlagsProvider flags={featureFlags || {}}>
      <CalendarEventsDetailsProvider events={events}>
        <CalendarViewProvider
          userViewId={userViewId}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          minColumnWidth={minColumnWidth}
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
      </CalendarEventsDetailsProvider>
    </CalendarFeatureFlagsProvider>
  );
};
