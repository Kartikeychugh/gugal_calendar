import { addHours, startOfToday } from "date-fns";
import { useState } from "react";
import { CalendarDimensionsProvider } from "../../@core";
import { useCreateClientEvent } from "../../hooks";
import { useCalendarEventsReusable } from "../../hooks/use-calendar-events.reusable";
import { CalendarContainerReusable } from "../calendar-container/calendar-container.component.reusable";
import { CalendarSchedulingFormDialogReusable } from "../calendar-scheduling-form-dialog/calendar-scheduling-form-dialog.component.reusable";

export const GugalCalendarReusable = (props: {
  minColumnWidth: number;
  minCellHeight: number;
}) => {
  const [selectedDate, setSelectedDate] = useState(startOfToday().valueOf());
  const createClientEvent = useCreateClientEvent();
  const events = useCalendarEventsReusable(selectedDate);
  const onCellClick = (date: Date, hour: number) => {
    createClientEvent(addHours(date, hour), addHours(date, hour + 1));
  };

  return (
    <CalendarDimensionsProvider
      value={{
        minCellHeight: props.minCellHeight,
        timeGridWidth: 50,
        minColumnWidth: props.minColumnWidth,
      }}
    >
      <CalendarContainerReusable
        events={events}
        userViewId={1}
        selectedDate={selectedDate}
        onCellClick={onCellClick}
        setSelectedDate={setSelectedDate}
      />
      <CalendarSchedulingFormDialogReusable setSelectedDate={setSelectedDate} />
    </CalendarDimensionsProvider>
  );
};
