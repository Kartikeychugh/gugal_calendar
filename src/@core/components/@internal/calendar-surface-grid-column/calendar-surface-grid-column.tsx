import { Box, useTheme } from "@mui/material";
import { addMinutes, isBefore, setHours, startOfDay } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useDragWatcher } from "../../../hooks";
import {
  useCalendarViewManager,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";
import { EventCardTimings } from "../calendar-surface-event-card/event-card-timings";

export const CalendarSurfaceGridColumn = React.memo(
  (props: { date: Date; onCellClick: (start: Date, end: Date) => void }) => {
    const { date, onCellClick } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [eventDragged, setEventDragged] = useState(false);
    const {
      viewDates,
      currentView: { numberOfDays },
    } = useCalendarViewManager();
    const cells = [];
    const { cellHeight } = useCalendarDimensionCellHeightContext();
    const theme = useTheme();
    const endDateOfView = viewDates[viewDates.length - 1].valueOf();

    const response = useDragWatcher(ref, "clientY", 15);

    useEffect(() => {
      if (!response.dragging && eventDragged) {
        const top = nearestToMultiple(response.dragStart, cellHeight / 4);
        const height = nearestToMultiple(response.dragDistance, cellHeight / 4);

        const { adjustedStartDate, adjustedEndDate } =
          calculatelankeEventTimings(height, top, date);

        onCellClick(adjustedStartDate, adjustedEndDate);
      }

      setEventDragged(response.dragging);
    }, [
      response.dragging,
      response.dragStart,
      response.dragDistance,
      cellHeight,
      eventDragged,
      date,
      onCellClick,
    ]);

    for (let i = 0; i < 24; i++) {
      cells.push(
        <Box
          key={i}
          sx={{
            height: `${cellHeight}px`,
            width: "100%",
            transition: "0.2s all ease-in-out",
            // borderRadius: "2px",
            boxShadow:
              i === 23
                ? endDateOfView === props.date.valueOf()
                  ? "none"
                  : `inset -1px 0px  ${
                      theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 300
                      ]
                    }`
                : endDateOfView === props.date.valueOf()
                ? `inset 0px -1px  ${
                    theme.palette.grey[
                      theme.palette.mode === "dark" ? 700 : 300
                    ]
                  }`
                : `inset -1px -1px  ${
                    theme.palette.grey[
                      theme.palette.mode === "dark" ? 700 : 300
                    ]
                  }`,
            "&:hover": {
              backgroundColor: `action.hover`,
            },
          }}
          onMouseUp={(e) => {
            if (!response.dragging)
              props.onCellClick(
                setHours(props.date, i),
                setHours(props.date, i + 1)
              );
          }}
        ></Box>
      );
    }
    return (
      <>
        <Box
          ref={ref}
          style={{
            width: "100%",
          }}
        >
          {response.dragging ? (
            <BlanketEvent
              top={nearestToMultiple(response.dragStart, cellHeight / 4)}
              height={nearestToMultiple(response.dragDistance, cellHeight / 4)}
              width={100 / numberOfDays}
              date={props.date}
              onCellClick={props.onCellClick}
            />
          ) : null}
          {cells}
        </Box>
      </>
    );
  }
);

const BlanketEvent = (props: {
  top: number;
  height: number;
  width: number;
  date: Date;
  onCellClick: (start: Date, end: Date) => void;
}) => {
  const { top, height, width, date } = props;

  console.log({ top, height });

  const { adjustedTop, adjustedHeight, adjustedStartDate, adjustedEndDate } =
    calculatelankeEventTimings(height, top, date);

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
      }}
    >
      <EventCardTimings start={adjustedStartDate} end={adjustedEndDate} />
    </Box>
  );
};
const nearestToMultiple = (value: number, multipleOf: number) => {
  return Math.floor(value / multipleOf) * multipleOf;
};

function calculatelankeEventTimings(height: number, top: number, date: Date) {
  const adjustedTop = height < 0 ? Math.max(top + height, 0) : top;
  const adjustedHeight = Math.abs(height);

  const startDate = addMinutes(startOfDay(date), adjustedTop);
  const endDate = addMinutes(startOfDay(date), adjustedTop + adjustedHeight);

  const adjustedStartDate = isBefore(startDate, endDate) ? startDate : endDate;
  const adjustedEndDate = isBefore(startDate, endDate) ? endDate : startDate;
  return { adjustedTop, adjustedHeight, adjustedStartDate, adjustedEndDate };
}
