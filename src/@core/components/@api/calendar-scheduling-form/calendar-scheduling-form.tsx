import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { useCreateGoogleEvent, useUpdateClientEvent } from "../../../../hooks";
import { ICalendarEventItem } from "../../../../models";
import { useDispatch } from "../../../../redux";
import { MeetingTitle } from "./meeting-title";
import { DateTimeSelector } from "./date-time-selector";
import { OnlineMeetingToggle } from "./online-meeting-selector";
import { FormActions } from "./form-actions";

import { DefaultTheme, makeStyles } from "@mui/styles";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    padding: "8px",
    "& .MuiSvgIcon-root": { fill: "#1976d2" },
  },
});

export const CalendarSchedulingForm = (props: {
  event: ICalendarEventItem;
  setSelectedDate: (newDate: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const classes = useStyle();

  const [meetingTitle, _setMeetingTitle] = useState("");
  const [onlineMeeting, _setOnlineMeeting] = useState(false);

  const dispatch = useDispatch();
  const addGoogleEvent = useCreateGoogleEvent();
  const updateClientEvent = useUpdateClientEvent();

  const setMeetingTitle = useCallback(
    (meetingTitle: string) => {
      const ev = { ...props.event };
      ev.summary = meetingTitle;
      updateClientEvent(ev);

      _setMeetingTitle(meetingTitle);
    },
    [props.event, updateClientEvent]
  );

  return (
    <Box className={classes.root}>
      <MeetingTitle
        meetingTitle={meetingTitle}
        setMeetingTitle={setMeetingTitle}
      />
      <DateTimeSelector
        startTime={props.event.start.dateTime}
        endTime={props.event.end.dateTime}
        onDateChange={(newValue: Date | null) => {
          if (!newValue) {
            return;
          }

          const e = { ...props.event };
          e.start.dateTime = newValue.toISOString();
          const newEndtime = newValue;
          newEndtime.setHours(new Date(props.event.end.dateTime).getHours());
          newEndtime.setMinutes(
            new Date(props.event.end.dateTime).getMinutes()
          );
          newEndtime.setSeconds(
            new Date(props.event.end.dateTime).getSeconds()
          );
          e.end.dateTime = newEndtime.toISOString();
          updateClientEvent(e);
          props.setSelectedDate(newValue.valueOf());
        }}
        onStartTimeChange={(newValue) => {
          if (!newValue) {
            return;
          }
          const e = { ...props.event };
          e.start.dateTime = newValue.toISOString();
          updateClientEvent(e);
        }}
        onEndTimeChange={(newValue) => {
          if (!newValue) {
            return;
          }
          const e = { ...props.event };
          e.end.dateTime = newValue.toISOString();
          updateClientEvent(e);
        }}
      />
      <OnlineMeetingToggle
        onlineMeeting={onlineMeeting}
        toggleOnlineMeeting={() => {
          _setOnlineMeeting(!onlineMeeting);
        }}
      />
      <FormActions
        onCancel={() => {
          dispatch({
            type: "REMOVE_CLIENT_EVENT",
          });
          props.onCancel();
        }}
        onSubmit={() => {
          const e = { ...props.event };
          e.client.status = "syncing";
          updateClientEvent(e);

          addGoogleEvent(props.event, meetingTitle, onlineMeeting);
          props.onSubmit();
        }}
      />
    </Box>
  );
};
