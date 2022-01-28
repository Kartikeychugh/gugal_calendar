import { CalendarDimensionsProvider, CalendarViewProvider } from "../../@core";
import { CalendarReduxProvider } from "../../redux";
import { CalendarContainer } from "../calendar-container";
import { CalendarSchedulingFormDialog } from "../calendar-scheduling-form-dialog";

export const GugalCalendar = (props: {
  minColumnWidth: number;
  minCellHeight: number;
}) => {
  return (
    <CalendarReduxProvider>
      <CalendarDimensionsProvider
        value={{
          minCellHeight: props.minCellHeight,
          timeGridWidth: 50,
          minColumnWidth: props.minColumnWidth,
        }}
      >
        <CalendarViewProvider>
          <CalendarContainer />
          <CalendarSchedulingFormDialog />
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
