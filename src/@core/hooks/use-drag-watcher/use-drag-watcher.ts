import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "../use-event-listener";

export const useDragWatcher = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  direction: "clientY",
  threshold = 2
) => {
  // Tells us about where mouseDown was pressed
  const [mouseDownPivot, setMouseDownPivot] = useState(-Infinity);
  // Whether dragging has begun. (and crossed the threshold)
  const [dragging, setDragging] = useState(false);
  // Distance from Top within the element where the mouseDown fired.
  const [dragStart, setDragStart] = useState(-1);
  // Distance travelled from dragStart point
  const [dragDistance, setDragDistance] = useState(0);

  const callback = useCallback(
    (e: MouseEvent) => {
      /**
       * On mousedown record it to check that mousedown actually happened on this element.
       * Record where the drag started
       * Reset the drag distance to zero.
       */
      setMouseDownPivot(e[direction]);
      setDragStart(e.offsetY);
      setDragDistance(0);
    },
    [setDragStart, direction, setDragDistance, setMouseDownPivot]
  );

  useEffect(() => {
    const eventListener = (e: MouseEvent) => {
      e.preventDefault();
      callback(e);
    };

    containerRef.current?.addEventListener(
      "mousedown",
      eventListener as EventListener
    );
    return () => {
      containerRef.current?.removeEventListener(
        "mousedown",
        eventListener as EventListener
      );
    };
  }, [callback]);

  useEventListener<MouseEvent>(
    document,
    "mouseup",
    useCallback(() => {
      // Check if mousedown happened in the context of the element
      if (mouseDownPivot !== -Infinity) {
        /**
         * Reset dragging and mousedown coordinate
         * if a mouse down actually happened in the first place
         */
        setMouseDownPivot(-Infinity);
        setDragging(false);
      }
    }, [setDragging, mouseDownPivot, setMouseDownPivot])
  );

  useEventListener<MouseEvent>(
    document,
    "mousemove",
    useCallback(
      (e) => {
        // Check if mousedown happened in the context of the element
        if (mouseDownPivot !== -Infinity) {
          // If threshold exceeds mark it as dragging start
          if (Math.abs(e[direction] - mouseDownPivot) > threshold) {
            setDragging(true);
          }

          setDragDistance(e[direction] - mouseDownPivot);
        }
      },
      [setDragDistance, mouseDownPivot, threshold, direction, setDragging]
    )
  );

  return {
    dragging,
    dragStart,
    dragDistance,
  };
};
