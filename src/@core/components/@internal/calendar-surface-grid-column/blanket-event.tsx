import { Box } from "@mui/material";
import { EventCardTimings } from "../calendar-surface-event-card/event-card-timings";
import { calculateBlankeEventTimings } from "./utils";

export const BlanketEvent = (props: {
  top: number;
  height: number;
  width: number;
  date: Date;
  onCellClick: (start: Date, end: Date) => void;
  cellHeight: number;
}) => {
  const { top, height, width, date, cellHeight } = props;

  const { adjustedTop, adjustedHeight, adjustedStartDate, adjustedEndDate } =
    calculateBlankeEventTimings(height, top, date, cellHeight);

  return (
    <Box
      sx={{
        position: "absolute",
        top: adjustedTop,
        height: adjustedHeight,
        backgroundColor: "primary.main",
        width: `calc(${width}%)`,
        color: "white",
        boxShadow: "0px 1px 4px 2px rgba(18,18,18,0.5)",
        transition: "0.05s all ease-in-out",
      }}
    >
      <EventCardTimings start={adjustedStartDate} end={adjustedEndDate} />
    </Box>
  );
};
