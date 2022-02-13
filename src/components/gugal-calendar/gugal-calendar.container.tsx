import { addHours, startOfToday } from "date-fns";
import { useCallback, useState } from "react";
import { CalendarContainer } from "..";
import { ICalendarFeatureFlags } from "../../@core";
import { useCalendarEvents, useClientEvent } from "../../hooks";
import { useDispatch, useSelector } from "../../redux";
import { CalendarSchedulingFormDialog } from "../calendar-scheduling-form-dialog";

export const GugalCalendar = (props: {
  minColumnWidth: number;
  minCellHeight: number;
  featureFlags?: ICalendarFeatureFlags;
}) => {
  const [selectedDate, setSelectedDate] = useState(startOfToday().valueOf());
  const { viewId } = useSelector((state) => state.view.userView);
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

  const onViewChange = useCallback(
    (newViewId: number) => {
      dispatch({ type: "SET_USER_VIEW", payload: newViewId });
    },
    [dispatch]
  );
  return (
    <>
      <CalendarContainer
        onViewChange={onViewChange}
        events={events}
        userViewId={viewId}
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
