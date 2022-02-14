import { Box } from "@mui/material";
import { useState } from "react";
import { useClientEvent } from "../../../../hooks";
import { useDispatch } from "../../../../redux";
import { MeetingTitle } from "./meeting-title";
import { DateTimeSelector } from "./date-time-selector";
import { OnlineMeetingToggle } from "./online-meeting-selector";
import { FormActions } from "./form-actions";

import { DefaultTheme, makeStyles } from "@mui/styles";
import { ICalendarClientEventItem } from "../../..";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    padding: "8px",
    "& .MuiSvgIcon-root": {
      // fill: "#1976d2"
    },
  },
});

export const CalendarSchedulingForm = (props: {
  event: ICalendarClientEventItem;
  onSelectedDateChange: (newDate: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const classes = useStyle();

  const [onlineMeeting, setOnlineMeeting] = useState(false);

  const dispatch = useDispatch();
  const {
    syncClientEvent,
    updateMeetingTitle,
    updateOnlineMeeting,
    updateDate,
    updateStartTime,
    updateEndTime,
  } = useClientEvent();

  return (
    <Box className={classes.root}>
      <MeetingTitle
        meetingTitle={props.event.summary || ""}
        setMeetingTitle={updateMeetingTitle}
      />
      <DateTimeSelector
        startTime={props.event.start.dateTime}
        endTime={props.event.end.dateTime}
        onDateChange={(newValue: Date | null) => {
          if (!newValue) {
            return;
          }

          updateDate(newValue);
          props.onSelectedDateChange(newValue.valueOf());
        }}
        onStartTimeChange={(newValue) => {
          if (!newValue) {
            return;
          }
          updateStartTime(newValue);
        }}
        onEndTimeChange={(newValue) => {
          if (!newValue) {
            return;
          }
          updateEndTime(newValue);
        }}
      />
      <OnlineMeetingToggle
        onlineMeeting={onlineMeeting}
        toggleOnlineMeeting={() => {
          updateOnlineMeeting(!onlineMeeting);
          setOnlineMeeting(!onlineMeeting);
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
          syncClientEvent();
          props.onSubmit();
        }}
      />
    </Box>
  );
};
