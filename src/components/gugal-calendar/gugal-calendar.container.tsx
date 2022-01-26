import { CalendarDimensionsProvider, CalendarViewProvider } from "../../@core";
import { CalendarReduxProvider } from "../../redux";
import { CalendarContainer } from "../calendar-container";
import { CalendarSchedulingForm } from "../calendar-scheduling-form-dialog";

export const GugalCalendar = (props: {
  columnMinWidth: number;
  minCellHeight: number;
}) => {
  return (
    <CalendarReduxProvider>
      <CalendarDimensionsProvider
        value={{
          minCellHeight: props.minCellHeight,
          timeGridWidth: 50,
          columnMinWidth: props.columnMinWidth,
        }}
      >
        <CalendarViewProvider>
          <CalendarContainer />
          <CalendarSchedulingForm />
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
