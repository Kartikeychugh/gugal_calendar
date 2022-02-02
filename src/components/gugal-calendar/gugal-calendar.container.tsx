import { addHours, startOfToday } from "date-fns";
import { useCallback, useState } from "react";
import { CalendarContainer } from "..";
import { ICalendarFeatureFlags } from "../../@core";
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
  featureFlags?: ICalendarFeatureFlags;
}) => {
  const [selectedDate, setSelectedDate] = useState(startOfToday().valueOf());
  const createClientEvent = useCreateClientEvent();
  const events = useCalendarEvents(selectedDate);
  const colors = useCalendarColors();
  const onCellClick = useCallback(
    (date: Date, hour: number) => {
      createClientEvent(addHours(date, hour), addHours(date, hour + 1));
    },
    [createClientEvent]
  );

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
        minCellHeight={props.minCellHeight}
        minColumnWidth={props.minColumnWidth}
        featureFlags={props.featureFlags}
      />
      <CalendarSchedulingFormDialog setSelectedDate={setSelectedDate} />
    </>
  ) : (
    <LoadingScreen />
  );
};
