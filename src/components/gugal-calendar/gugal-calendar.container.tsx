import { addHours, startOfToday } from "date-fns";
import { useState } from "react";
import { CalendarContainer } from "..";
import {
  useCalendarColors,
  useCalendarEvents,
  useCreateClientEvent,
} from "../../hooks";
import { CalendarSchedulingFormDialog } from "../calendar-scheduling-form-dialog";

import { LoadingScreen } from "../loading-screen";

export const GugalCalendar = (props: {
  minColumnWidth: number;
  minCellHeight: number;
}) => {
  const [selectedDate, setSelectedDate] = useState(startOfToday().valueOf());
  const createClientEvent = useCreateClientEvent();
  const events = useCalendarEvents(selectedDate);
  const colors = useCalendarColors();
  const onCellClick = (date: Date, hour: number) => {
    createClientEvent(addHours(date, hour), addHours(date, hour + 1));
  };

  return colors ? (
    <>
      <CalendarContainer
        colors={colors}
        events={events}
        userViewId={1}
        selectedDate={selectedDate}
        onCellClick={onCellClick}
        setSelectedDate={setSelectedDate}
        onHeaderClick={(date) => {
          console.log({ date });
        }}
        dimensions={{
          minCellHeight: props.minCellHeight,
          timeGridWidth: 50,
          minColumnWidth: props.minColumnWidth,
        }}
      />
      <CalendarSchedulingFormDialog setSelectedDate={setSelectedDate} />
    </>
  ) : (
    <LoadingScreen />
  );
};
