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

    useEffect(() => {
      if (!response.dragging && eventDragged) {
        const top = nearestToMultiple(response.dragStart, cellHeight / 4);
        const height = nearestToMultiple(response.dragDistance, cellHeight / 4);
        const { adjustedStartDate, adjustedEndDate } =
          calculatelankeEventTimings(height, top, date, cellHeight);
        onCellClick(adjustedStartDate, adjustedEndDate);
      }

      setEventDragged(response.dragging);
    }, [response, cellHeight, date, eventDragged, onCellClick]);

    // useEffect(() => {
    //   if (!response.dragging && eventDragged) {
    //     const top = nearestToMultiple(response.dragStart, cellHeight / 4);
    //     const height = nearestToMultiple(response.dragDistance, cellHeight / 4);

    //     const { adjustedStartDate, adjustedEndDate } =
    //       calculatelankeEventTimings(height, top, date);

    //     onCellClick(adjustedStartDate, adjustedEndDate);
    //   }

    //   setEventDragged(response.dragging);
    // }, [
    //   response.dragging,
    //   response.dragStart,
    //   response.dragDistance,
    //   cellHeight,
    //   eventDragged,
    //   date,
    //   onCellClick,
    // ]);

    for (let i = 0; i < 24; i++) {
      cells.push(
        <GridCell
          key={i}
          cellHeight={cellHeight}
          i={i}
          date={date}
          setResponse={setResponse}
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
          {response.dragging ? (
            <BlanketEvent
              top={nearestToMultiple(response.dragStart, cellHeight / 4)}
              height={nearestToMultiple(response.dragDistance, cellHeight / 4)}
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
    setResponse: (res: any) => void;
    i: number;
  }) => {
    const { cellHeight, i, setResponse, date } = props;
    const theme = useTheme();
    const {
      viewDates,
      currentView: { numberOfDays },
    } = useCalendarViewManager();
    const endDateOfView = viewDates[viewDates.length - 1].valueOf();
    const ref = useRef<HTMLDivElement>(null);

    const response = useDragWatcher("clientY", 15);

    useEffect(() => {
      const stopListening = response.startListening(ref.current);
      return () => {
        stopListening();
      };
    }, [response.startListening]);

    useEffect(() => {
      setResponse({
        ...response,
        dragStart: i * cellHeight + response.dragStart,
      });
    }, [response, cellHeight]);

    return (
      <Box
        ref={ref}
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
                  theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
                }`
              : `inset -1px -1px  ${
                  theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
                }`,
          "&:hover": {
            backgroundColor: `action.hover`,
          },
        }}
        // onMouseUp={(e) => {
        //   if (!dragging)
        //     props.onCellClick(
        //       setHours(props.date, i),
        //       setHours(props.date, i + 1)
        //     );
        // }}
      />
    );
  }
);
