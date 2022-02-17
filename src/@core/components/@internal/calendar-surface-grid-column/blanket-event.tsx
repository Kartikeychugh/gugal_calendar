import { Box } from "@mui/material";
import { addMinutes, startOfDay, isBefore } from "date-fns";
import { EventCardTimings } from "../calendar-surface-event-card/event-card-timings";

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
    calculatelankeEventTimings(height, top, date, cellHeight);

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

export const nearestToMultiple = (value: number, multipleOf: number) => {
  return Math.floor(value / multipleOf) * multipleOf;
};

export function calculatelankeEventTimings(
  height: number,
  top: number,
  date: Date,
  cellHeight: number
) {
  const adjustedTop = height < 0 ? Math.max(top + height, 0) : top;
  const adjustedHeight = Math.abs(height);

  const startDate = addMinutes(
    startOfDay(date),
    adjustedTop * (60 / cellHeight)
  );
  const endDate = addMinutes(
    startOfDay(date),
    (adjustedTop + adjustedHeight) * (60 / cellHeight)
  );

  const adjustedStartDate = isBefore(startDate, endDate) ? startDate : endDate;
  const adjustedEndDate = isBefore(startDate, endDate) ? endDate : startDate;
  return { adjustedTop, adjustedHeight, adjustedStartDate, adjustedEndDate };
}
