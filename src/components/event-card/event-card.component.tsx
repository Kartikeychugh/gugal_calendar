import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { useRef } from "react";
import { Box } from "@mui/material";
import { useCalendarColors } from "../../hooks/use-calendar-colors";

export const EventCard = (props: { event: ICalendarEventItem }) => {
  const { event } = props;
  const ele = useRef(null);
  const colors = useCalendarColors();

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
  const colorId = event.colorId ? event.colorId : 1;
  return (
    <Box
      key={props.event.id}
      ref={ele}
      sx={{
        display: "flex",
        position: "absolute",
        cursor: "pointer",
        pointerEvents: "all",
        top: event.layout.top,
        height: event.layout.height,
        width: event.layout.width,
        left: event.layout.left,
        overflow: "hidden",
        borderRadius: "5px",
      }}>
      <Box sx={{ background: "#0ea5e9", minWidth: "2px" }}></Box>
      <Box sx={{ backgroundColor: "#e0f2fe", padding: "5px", width: "100%" }}>
        <Box
          sx={{
            height: "16px",
            fontSize: "10px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Box
            sx={{
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "10px",
              lineHeight: "16px",
              color: "#0369a1",
            }}>
            {hoursStr}:{minutesStr} {ampm}
          </Box>
          {event.hangoutLink ? (
            <Box
              sx={{
                height: "100%",
                marginLeft: "4px",
                transition: "all 0.5s ease-in",
                "&:hover": {
                  cursor: "pointer",
                },
                "&:hover > svg ": {
                  fill: "#0ea5e9",
                },
              }}>
              <VideoCallIcon
                onClick={() => window.open(event.hangoutLink)}
                style={{ position: "relative", top: "-2px" }}
                htmlColor="#0369A1"
                sx={{ fontSize: 20 }}
              />
            </Box>
          ) : null}
        </Box>
        <Box
          sx={{
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "10px",
            lineHeight: "16px",
            height: "calc(100% - 16px)",
            overflow: "hidden",
            color: "#0369a1",
          }}>
          <Box>{event.summary}</Box>
        </Box>
      </Box>
    </Box>
  );
};
