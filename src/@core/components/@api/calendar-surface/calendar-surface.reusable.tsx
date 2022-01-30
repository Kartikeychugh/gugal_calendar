import { ICalendarEventItem } from "../../../models";
import { CalendarEventsDetailsProvider } from "../../../providers/calendar-events-details";
import { CalendarViewProviderReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";
import { CalendarSurfaceRendererResuable } from "../../@internal/calendar-surface-renderer/calendar-surface-renderer.reusable";

export const CalendarSurfaceReusable = (props: {
  events: ICalendarEventItem[];
  colors: CalendarColors;
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  userViewId: number;
  selectedDate: number;
  setSelectedDate: (newDate: number) => void;
  hideCommandBar?: boolean;
  dimensions: {
    minCellHeight: number;
    timeGridWidth: number;
    minColumnWidth: number;
  };
}) => {
  const {
    events,
    colors,
    userViewId,
    selectedDate,
    setSelectedDate,
    onHeaderClick,
    onCellClick,
    hideCommandBar = false,
    dimensions,
  } = props;

  return (
    <CalendarEventsDetailsProvider events={events} colors={colors}>
      <CalendarViewProviderReusable
        userViewId={userViewId}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dimensions={dimensions}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <CalendarSurfaceRendererResuable
            onCellClick={onCellClick}
            onHeaderClick={onHeaderClick}
            hideCommandBar={hideCommandBar}
          />
        </div>
      </CalendarViewProviderReusable>
    </CalendarEventsDetailsProvider>
  );
};
