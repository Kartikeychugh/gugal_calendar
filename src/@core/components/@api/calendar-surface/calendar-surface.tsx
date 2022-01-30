import { ICalendarEventItem } from "../../../models";
import { CalendarViewProvider } from "../../../providers";
import { CalendarEventsDetailsProvider } from "../../../providers/calendar-events-details";
import { CalendarSurfaceRenderer } from "../../@internal";

export const CalendarSurface = (props: {
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
      <CalendarViewProvider
        userViewId={userViewId}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dimensions={dimensions}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <CalendarSurfaceRenderer
            onCellClick={onCellClick}
            onHeaderClick={onHeaderClick}
            hideCommandBar={hideCommandBar}
          />
        </div>
      </CalendarViewProvider>
    </CalendarEventsDetailsProvider>
  );
};
