import "./event-card.css";

import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { useRef } from "react";

export const EventCard = (props: { event: ICalendarEventItem }) => {
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

  return (
    <div
      key={props.event.id}
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
  );
};
