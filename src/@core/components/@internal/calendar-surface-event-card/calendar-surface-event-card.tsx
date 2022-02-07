import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Box, CircularProgress } from "@mui/material";
import { clientEventStatus, ICalendarEventItem } from "../../../models";

export const CalendarSurfaceEventCard = (props: {
  event: ICalendarEventItem;
}) => {
  const { event } = props;

  return (
    <Box
      key={props.event.id}
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
        transition: "0.2s all ease-in-out",
        "&:hover": {
          opacity: "0.8",
        },
      }}
    >
      <Box
        sx={{
          background: event.colors.calendar.backgroundColor,
          minWidth: "3px",
        }}
      ></Box>
      <Box
        sx={{
          backgroundColor: event.colors.event.backgroundColor,
          color: event.colors.event.foregroundColor,
          padding: "0px 5px 0px 5px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "16px",
            fontSize: "10px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "10px",
              lineHeight: "16px",
            }}
          >
            {new Date(event.start.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(event.end.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
              }}
            >
              <VideoCallIcon
                onClick={() => window.open(event.hangoutLink)}
                style={{ position: "relative", top: "-2px" }}
                htmlColor="#0369A1"
                sx={{ fontSize: 20 }}
              />
            </Box>
          ) : null}
          {event.client?.status === clientEventStatus.syncing ? (
            <CircularProgress
              style={{
                position: "relative",
                top: "3px",
                height: "1em",
                width: "1em",
              }}
              color="inherit"
            />
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
          }}
        >
          <Box>{event.summary}</Box>
        </Box>
      </Box>
    </Box>
  );
};
