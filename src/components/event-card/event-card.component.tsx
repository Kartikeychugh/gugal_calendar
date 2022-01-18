import "./event-card.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useDispatch } from "../../redux/hooks/use-dispatch";
import Draggable from "react-draggable";
import { CreateEventForm } from "../create-event-form/create-event-form";

export const EventCard = (props: { event: ICalendarEventItem }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { event } = props;
  const ele = useRef(null);
  const time = new Date(event.start.dateTime);

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let hoursStr = hours.toLocaleString();
  let minutesStr = minutes.toLocaleString();
  let ampm = "AM";

  if (hours >= 12) {
    ampm = "PM";
  }

  if (hours < 10) {
    hoursStr = `0${hoursStr}`;
  }

  if (minutes < 10) {
    minutesStr = `0${minutesStr}`;
  }

  useEffect(() => {
    setOpen(!!(props.event.client && props.event.client.clientLie));
  }, [props, setOpen]);

  return (
    <>
      <div
        ref={ele}
        className="event-card-container"
        style={{
          pointerEvents: "all",
          top: event.layout.top,
          height: event.layout.height,
          width: event.layout.width,
          left: event.layout.left,
          overflow: "hidden",
          borderRadius: "5px",
        }}>
        <div className="event-card-bar"></div>
        <div className="event-card-summary">
          <div className="first-line">
            <div className="event-timing">
              {hoursStr}:{minutesStr} {ampm}
            </div>
            {event.hangoutLink ? (
              <div className="online-call">
                <VideoCallIcon
                  onClick={() => window.open(event.hangoutLink)}
                  style={{ position: "relative", top: "-2px" }}
                  htmlColor="#0369A1"
                  sx={{ fontSize: 20 }}
                />
              </div>
            ) : null}
          </div>
          <div className="second-line">
            <span>{event.summary}</span>
          </div>
        </div>
      </div>
      {ele.current ? (
        <Dialog
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "transparent",
            },
            "& .MuiPaper-root": {
              pointerEvents: "all",
              margin: 0,
            },
          }}
          container={ele.current}
          disablePortal={true}
          open={open}
          onClose={() => {
            setOpen(false);
            dispatch({
              type: "REMOVE_CLIENT_EVENT",
              payload: props.event.id,
            });
          }}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title">
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
              dispatch({
                type: "REMOVE_CLIENT_EVENT",
                payload: props.event.id,
              });
            }}>
            <Box>
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              />
              <DialogContent>
                <CreateEventForm event={props.event} />
              </DialogContent>
            </Box>
          </ClickAwayListener>
        </Dialog>
      ) : null}
    </>
  );
};

function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}>
      <div>
        <Paper {...props} />
      </div>
    </Draggable>
  );
}
