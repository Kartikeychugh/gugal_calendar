import {
  CalendarDimensionsProvider,
  CalendarViewProvider,
  CreateEventFormDialog,
} from "../../@core";
import { CalendarReduxProvider } from "../../redux";
import { CalendarContainer } from "../calendar-container";

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
          <CreateEventFormDialog />
        </CalendarViewProvider>
      </CalendarDimensionsProvider>
    </CalendarReduxProvider>
  );
};
