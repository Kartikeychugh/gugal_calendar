import "./event-card.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";

export const EventCard = (props: {
  event: CalendarEventItem;
  x: number;
  y: number;
}) => {
  const { event } = props;
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
      style={{
        position: "absolute",
        top: `calc((100vh/12)*${props.y})`,
        left: `calc((100vw/7)*${props.x})`,
      }}
      className="event-card-container">
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
