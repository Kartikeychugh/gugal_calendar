import { Box, Theme, useTheme } from "@mui/material";
import { setHours } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useDragWatcher } from "../../../hooks";
import {
  useCalendarViewManager,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";
import {
  nearestToMultiple,
  calculatelankeEventTimings,
  BlanketEvent,
} from "./blanket-event";

export const CalendarSurfaceGridColumn = React.memo(
  (props: { date: Date; onCellClick: (start: Date, end: Date) => void }) => {
    const { date, onCellClick } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [eventDragged, setEventDragged] = useState(false);

    const [response, setResponse] = useState<{
      dragging: boolean;
      dragStart: number;
      dragDistance: number;
    }>({
      dragging: false,
      dragStart: -1,
      dragDistance: 0,
    });

    const {
      currentView: { numberOfDays },
    } = useCalendarViewManager();
    const cells = [];
    const { cellHeight } = useCalendarDimensionCellHeightContext();

    const dragger = useDragWatcher("clientY", 15, (e: Event) => {
      if (e.target) {
        return (e.target as any).dataset.key * cellHeight + (e as any).offsetY;
      }
    });

    useEffect(() => {
      const stopListening = dragger.startListening(ref.current);
      return () => {
        stopListening();
      };
    }, [dragger.startListening]);

    useEffect(() => {
      if (!dragger.dragging && eventDragged) {
        const top = nearestToMultiple(dragger.dragStart, cellHeight / 4);
        const height = nearestToMultiple(dragger.dragDistance, cellHeight / 4);
        const { adjustedStartDate, adjustedEndDate } =
          calculatelankeEventTimings(height, top, date, cellHeight);
        onCellClick(adjustedStartDate, adjustedEndDate);
      }

      setEventDragged(dragger.dragging);
    }, [
      dragger.dragging,
      dragger.dragDistance,
      dragger.dragStart,
      cellHeight,
      date,
      eventDragged,
      onCellClick,
    ]);

    for (let i = 0; i < 24; i++) {
      cells.push(
        <GridCell
          key={i}
          cellHeight={cellHeight}
          i={i}
          date={date}
          onCellClick={props.onCellClick}
        />
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
          {dragger.dragging ? (
            <BlanketEvent
              top={nearestToMultiple(dragger.dragStart, cellHeight / 4)}
              height={nearestToMultiple(dragger.dragDistance, cellHeight / 4)}
              width={100 / numberOfDays}
              date={props.date}
              onCellClick={props.onCellClick}
              cellHeight={cellHeight}
            />
          ) : null}
          {cells}
        </Box>
      </>
    );
  }
);

const GridCell = React.memo(
  (props: {
    cellHeight: number;
    date: Date;
    i: number;
    onCellClick: (start: Date, end: Date) => void;
  }) => {
    const { cellHeight, i } = props;
    const theme = useTheme();
    const { viewDates } = useCalendarViewManager();
    const endDateOfView = viewDates[viewDates.length - 1].valueOf();
    const ref = useRef<HTMLDivElement>(null);

    return (
      <Box
        data-key={i}
        ref={ref}
        key={i}
        sx={{
          height: `${cellHeight}px`,
          width: "100%",
          transition: "0.2s all ease-in-out",
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
                  theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
                }`
              : `inset -1px -1px  ${
                  theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
                }`,
          "&:hover": {
            backgroundColor: `action.hover`,
          },
        }}
        onMouseUp={(e) => {
          props.onCellClick(
            setHours(props.date, i),
            setHours(props.date, i + 1)
          );
        }}
      />
    );
  }
);
