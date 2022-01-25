import { CalendarDimensionsProvider, CalendarViewProvider } from "../../@core";
import { CalendarReduxProvider } from "../../redux/provider/provider";
import { CalendarContainer } from "../calendar-container";

export const GugalCalendar = (props: {
  columnMinWidth: number;
  cellHeight: number;
}) => {
  return (
    <CalendarReduxProvider>
      <CalendarDimensionsProvider
        value={{
          cellHeight: props.cellHeight,
          timeGridWidth: 50,
          columnMinWidth: props.columnMinWidth,
          surfacePadding: 16,
        }}
      >
        <CalendarViewProvider>
          <CalendarContainer />
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
