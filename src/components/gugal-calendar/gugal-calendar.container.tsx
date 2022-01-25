import {
  CalendarDimensionsProvider,
  CalendarViewProvider,
  CreateEventFormDialog,
} from "../../@core";
import { CalendarReduxProvider } from "../../redux";
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
          <CreateEventFormDialog />
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
