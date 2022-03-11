import { Box } from "@mui/material";
import { setHours } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDragWatcher } from "../../../hooks";
import {
  useCalendarViewManager,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";
import { CalendarGridCellsRenderer } from "../calendar-grid-cells";
import { BlanketEvent } from "./blanket-event";
import { calculateBlankeEventTimings, nearestToMultiple } from "./utils";

export const CalendarSurfaceGridColumn = React.memo(
  (props: { date: Date; onCellClick: (start: Date, end: Date) => void }) => {
    const { date, onCellClick } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [eventDragged, setEventDragged] = useState(false);
    const {
      currentView: { numberOfDays },
    } = useCalendarViewManager();
    const { cellHeight } = useCalendarDimensionCellHeightContext();

    const { startDragListening, dragStart, dragDistance, dragging } =
      useDragWatcher(
        "clientY",
        15,
        useOnClickHandler(onCellClick, date),
        useDragStartHandler(cellHeight)
      );

    useDragAndClickEffect(startDragListening, ref);

    useEffect(() => {
      /**
       * If dragging stopped then trigger onCellClick
       */
      if (!dragging && eventDragged) {
        const top = nearestToMultiple(dragStart, cellHeight / 4);
        const height = nearestToMultiple(dragDistance, cellHeight / 4);

        const { adjustedStartDate, adjustedEndDate } =
          calculateBlankeEventTimings(height, top, date, cellHeight);
        onCellClick(adjustedStartDate, adjustedEndDate);
      }

      setEventDragged(dragging);
    }, [
      dragging,
      dragDistance,
      dragStart,
      cellHeight,
      date,
      eventDragged,
      onCellClick,
    ]);

    return (
      <>
        <Box
          ref={ref}
          style={{
            width: "100%",
          }}
        >
          {dragging ? (
            <BlanketEvent
              top={nearestToMultiple(dragStart, cellHeight / 4)}
              height={nearestToMultiple(dragDistance, cellHeight / 4)}
              width={100}
              date={props.date}
              onCellClick={props.onCellClick}
              cellHeight={cellHeight}
            />
          ) : null}
          <CalendarGridCellsRenderer date={date} cellHeight={cellHeight} />
        </Box>
      </>
    );
  }
);

const useDragStartHandler = (cellHeight: number) =>
  useCallback(
    (e: Event) => {
      const cellHour = parseInt((e.target as HTMLElement).dataset.key || "0");

      if (e.target) {
        const offsetY = (e as MouseEvent).offsetY;
        const cellTop = cellHour * cellHeight;

        return offsetY + cellTop;
      }

      return 0;
    },
    [cellHeight]
  );

const useOnClickHandler = (
  onCellClick: (start: Date, end: Date) => void,
  date: Date
) =>
  useCallback(
    (e: MouseEvent) => {
      const cellHour = parseInt((e.target as HTMLElement).dataset.key || "0");
      onCellClick(setHours(date, cellHour), setHours(date, cellHour + 1));
    },
    [onCellClick, date]
  );

const useDragAndClickEffect = (
  startDragListening: (element: Node | null) => () => void,
  ref: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const stopListening = startDragListening(ref.current);
    return () => {
      stopListening();
    };
  }, [startDragListening, ref]);
};
