import "./event-card.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";

export const EventCard = (props: {
  event: CalendarEventItem;
  colors?: CalendarColors;
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
      className="event-card-container"
      style={{ top: `calc(60*${hours}px)` }}>
      <div className="event-card-bar"></div>
      <div
        className="event-card-summary"
        // style={{
        //   background: !event.colorId
        //     ? "#0ea5e91a"
        //     : props.colors.event[event.colorId].background,
        //   color: !event.colorId
        //     ? "#0369a1"
        //     : props.colors.event[event.colorId].foreground,
        // }}
      >
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
