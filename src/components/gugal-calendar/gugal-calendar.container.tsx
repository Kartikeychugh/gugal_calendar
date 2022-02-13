import { addHours, startOfToday } from "date-fns";
import { useCallback, useState } from "react";
import { CalendarContainer } from "..";
import { ICalendarFeatureFlags } from "../../@core";
import { useCalendarEvents, useClientEvent } from "../../hooks";
import { useDispatch } from "../../redux";
import { CalendarSchedulingFormDialog } from "../calendar-scheduling-form-dialog";

export const GugalCalendar = (props: {
  minColumnWidth: number;
  minCellHeight: number;
  featureFlags?: ICalendarFeatureFlags;
}) => {
  const [selectedDate, setSelectedDate] = useState(startOfToday().valueOf());
  const { createClientEvent } = useClientEvent();
  const events = useCalendarEvents(selectedDate);
  const dispatch = useDispatch();

  const onCellClick = useCallback(
    (date: Date, hour: number) => {
      dispatch({ type: "SET_FORM_OPEN", payload: true });
      createClientEvent(addHours(date, hour), addHours(date, hour + 1));
    },
    [createClientEvent, dispatch]
  );

  return (
    <>
      <CalendarContainer
        events={events}
        userViewId={1}
        selectedDate={selectedDate}
        onCellClick={onCellClick}
        setSelectedDate={setSelectedDate}
        onHeaderClick={(date) => {
          console.log({ date });
        }}
        minCellHeight={props.minCellHeight}
        minColumnWidth={props.minColumnWidth}
        featureFlags={props.featureFlags}
      />
      <CalendarSchedulingFormDialog setSelectedDate={setSelectedDate} />
    </>
  );
};
