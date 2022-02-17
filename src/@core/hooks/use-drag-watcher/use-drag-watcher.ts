import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "../use-event-listener";

export const useDragWatcher = (direction: "clientY", threshold = 2) => {
  // Tells us about where mouseDown was pressed
  const [mouseDownPivot, setMouseDownPivot] = useState(-Infinity);
  // Whether dragging has begun. (and crossed the threshold)
  const [dragging, setDragging] = useState(false);
  // Distance from Top within the element where the mouseDown fired.
  const [dragStart, setDragStart] = useState(-1);
  // Distance travelled from dragStart point
  const [dragDistance, setDragDistance] = useState(0);

  const { mouseUpCallback, mouseMoveCallback, mouseDownCallback } =
    useGenerateEventCallbacks(
      setMouseDownPivot,
      direction,
      setDragStart,
      setDragDistance,
      mouseDownPivot,
      setDragging,
      threshold
    );

  useEventListener<MouseEvent>(document, "mouseup", mouseUpCallback);
  useEventListener<MouseEvent>(document, "mousemove", mouseMoveCallback);

  const startListening = useCallback(
    (element: Node | null) => {
      element?.addEventListener(
        "mousedown",
        mouseDownCallback as EventListener
      );

      return () => {
        element?.removeEventListener(
          "mousedown",
          mouseDownCallback as EventListener
        );
      };
    },
    [mouseDownCallback]
  );

  return {
    dragging,
    dragStart,
    dragDistance,
    startListening,
  };
};

function useGenerateEventCallbacks(
  setMouseDownPivot: React.Dispatch<React.SetStateAction<number>>,
  direction: "clientY",
  setDragStart: React.Dispatch<React.SetStateAction<number>>,
  setDragDistance: React.Dispatch<React.SetStateAction<number>>,
  mouseDownPivot: number,
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  threshold: number
) {
  const mouseDownCallback = useCallback(
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

  const mouseUpCallback = useCallback(() => {
    // Check if mousedown happened in the context of the element
    if (mouseDownPivot !== -Infinity) {
      /**
       * Reset dragging and mousedown coordinate
       * if a mouse down actually happened in the first place
       */
      setMouseDownPivot(-Infinity);
      setDragging(false);
    }
  }, [setDragging, mouseDownPivot, setMouseDownPivot]);

  const mouseMoveCallback = useCallback(
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
  );
  return { mouseUpCallback, mouseMoveCallback, mouseDownCallback };
}
