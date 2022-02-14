import { Box, Typography, CircularProgress } from "@mui/material";
import { EventCardIcons } from "./event-card-icons";
import { EventCardTimings } from "./event-card-timings";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useMemo } from "react";
import { FluidText } from "../fluid-text/fluid-text";
import { clientEventStatus, ICalendarEventItem } from "../../@core";

export const colorShade = (col: string, amt: number) => {
  col = col.replace(/^#/, "");
  if (col.length === 3)
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  let [r, g, b]: any = col.match(/.{2}/g);
  [r, g, b] = [
    parseInt(r, 16) + amt,
    parseInt(g, 16) + amt,
    parseInt(b, 16) + amt,
  ];

  r = Math.max(Math.min(255, r), 0).toString(16);
  g = Math.max(Math.min(255, g), 0).toString(16);
  b = Math.max(Math.min(255, b), 0).toString(16);

  const rr = (r.length < 2 ? "0" : "") + r;
  const gg = (g.length < 2 ? "0" : "") + g;
  const bb = (b.length < 2 ? "0" : "") + b;

  return `#${rr}${gg}${bb}`;
};

export const EventCardDetailsHolders = (props: {
  event: ICalendarEventItem;
}) => {
  const { event } = props;

  return (
    <Box
      sx={{
        backgroundColor: event.colors.event.backgroundColor,
        color: event.colors.event.foregroundColor,
        padding: "0px 5px 0px 5px",
        width: "100%",
        borderLeft: "4px solid",

        borderLeftColor: event.colors.calendar.backgroundColor,
      }}
    >
      <EventCardTopBar event={event} />
      <EventCardSummary summary={event.summary || ""} />
    </Box>
  );
};

const EventCardTopBar = (props: { event: ICalendarEventItem }) => {
  const { event } = props;
  const icons = useMemo(() => eventCardIcons(event), [event]);

  return (
    <Box
      sx={{
        height: "16px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{ width: `calc(100% - ${icons.length ? icons.length * 20 : 0}px)` }}
      >
        <EventCardTimings event={event} />
      </Box>
      <Box>
        <EventCardIcons icons={icons} />
      </Box>
    </Box>
  );
};

const EventCardSummary = (props: { summary: string }) => {
  const { summary } = props;
  return (
    <Typography
      letterSpacing={0}
      fontWeight="500"
      fontSize={"12px"}
      variant="subtitle1"
      width={`calc(100%)`}
    >
      <FluidText minFontPercentage={80}>{summary}</FluidText>
    </Typography>
  );
};

const eventCardIcons = (event: ICalendarEventItem) => [
  ...(event.hangoutLink
    ? [
        <VideoCallIcon
          key={0}
          onClick={() => window.open(event.hangoutLink)}
          style={{
            position: "relative",
            top: "-2px",
            height: "20px",
            width: "20px",
          }}
          sx={{ fontSize: 20 }}
          color="inherit"
        />,
      ]
    : []),
  ...(event.client?.status === clientEventStatus.syncing
    ? [
        <CircularProgress
          key={1}
          style={{
            position: "relative",
            top: "3px",
            height: "20px",
            width: "20px",
          }}
          color="inherit"
        />,
      ]
    : []),
];
