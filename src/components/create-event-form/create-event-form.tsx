import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAddGoogleEvent } from "../../hooks/use-add-event";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LoadingButton, TimePicker } from "@mui/lab";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useDispatch } from "../../redux/hooks/use-dispatch";
export const CreateEventForm = (props: { event: ICalendarEventItem }) => {
  const [state, setState] = useState({
    onlineMeeting: false,
    meetingTitle: "",
    loading: false,
  });
  const dispatch = useDispatch();

  const addGoogleEvent = useAddGoogleEvent();
  return (
    <Box sx={{ p: 1, "& .MuiSvgIcon-root": { fill: "#1976d2" } }}>
      <Box
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { right: "50px" },
          "& .MuiSvgIcon-root": {
            width: "24px",
            top: "7px",
            position: "relative",
          },
          display: "flex",
          alignItems: "center",
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#1976d2",
          },
          "& .MuiInput-root:after": {
            borderBottomColor: "#1976d2",
          },
        }}>
        <ArticleRoundedIcon />
        <TextField
          sx={{ ml: 3 }}
          autoComplete="off"
          fullWidth
          id="standard-basic"
          label="Add meeting title"
          variant="standard"
          value={state.meetingTitle}
          onChange={(e) => {
            console.log(e.target.value);
            setState({ ...state, meetingTitle: e.target.value });
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          "& .MuiFormControl-root": { ml: 3 },
          "& .MuiOutlinedInput-input": { padding: "8px 7px", fontSize: "13px" },
          // "& .MuiOutlinedInput-notchedOutline": { right: "50px" },
          display: "flex",
          alignItems: "center",
        }}>
        <AccessTimeIcon sx={{ color: "#5f6368", fill: "#5f6368" }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="From"
            value={new Date(props.event.start.dateTime)}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <TimePicker
            label="To"
            value={new Date(props.event.end.dateTime)}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          "& .MuiButton-root": {
            ml: 3,
            fontSize: "11px",
            height: "fit-content",
            padding: "5px 11px",
            fontWeight: 600,
            fontStyle: "normal",
            borderRadius: "10px",
          },
          "& .MuiSvgIcon-root": {
            height: "24px",
            width: "24px",
          },
          mt: 3,
          "& .MuiFormControl-root": { ml: 3 },
          "& .MuiOutlinedInput-input": { padding: "8px 7px" },
          display: "flex",
          alignItems: "center",
        }}>
        <VideoCallIcon />
        <Button
          {...(!state.onlineMeeting
            ? { variant: "contained" }
            : { variant: "outlined" })}
          onClick={() => {
            setState({ ...state, onlineMeeting: !state.onlineMeeting });
          }}>
          {state.onlineMeeting
            ? "Remove Google Meet video conferencing"
            : "Add Google Meet video conferencing"}
        </Button>
      </Box>
      <Box
        sx={{
          mt: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          "& .MuiButton-root": {
            ml: 1,
            fontSize: "12px",
            fontWeight: "600",
          },
        }}>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch({
              type: "REMOVE_CLIENT_EVENT",
              payload: props.event.id,
            });
          }}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={state.loading}
          loadingPosition="center"
          onClick={() => {
            setState({ ...state, loading: true });
            addGoogleEvent(
              props.event,
              state.meetingTitle,
              state.onlineMeeting
            );
          }}>
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};
