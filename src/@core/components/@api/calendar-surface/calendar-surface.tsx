import {
  ICalendarEvent,
  ICalendarEventItem,
  ICalendarFeatureFlags,
} from "../../../models";
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
  onCellClick: (start: Date, end: Date) => void;
  userViewId: number;
  selectedDate: number;
  onSelectedDateChange: (newDate: number) => void;
  minCellHeight: number;
  minColumnWidth: number;
  featureFlags?: ICalendarFeatureFlags;
  onViewChange?: (newViewId: number) => void;
  CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const {
    events,
    userViewId,
    selectedDate,
    onSelectedDateChange,
    onHeaderClick,
    onCellClick,
    featureFlags,
    minColumnWidth,
    minCellHeight,
    onViewChange,
    CientEventCard,
  } = props;

  return (
    <CalendarFeatureFlagsProvider flags={featureFlags || {}}>
      <CalendarEventsDetailsProvider events={events}>
        <CalendarDateProvider
          selectedDate={selectedDate}
          onSelectedDateChange={onSelectedDateChange}
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
                  CientEventCard={CientEventCard}
                />
              </div>
            </CalendarDimensionCellHeightProvider>
          </CalendarViewProvider>
        </CalendarDateProvider>
      </CalendarEventsDetailsProvider>
    </CalendarFeatureFlagsProvider>
  );
};
