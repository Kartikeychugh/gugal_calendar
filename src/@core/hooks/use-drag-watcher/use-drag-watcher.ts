import React, { useCallback, useState } from "react";
import { useEventListener } from "../use-event-listener";

export const useDragWatcher = (
  direction: "clientY",
  threshold = 2,
  onClick?: (e: MouseEvent) => void,
  dragStartCalculator?: (e: Event) => number
) => {
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
      threshold,
      dragDistance,
      dragging,
      dragStartCalculator,
      onClick
    );

  useEventListener<MouseEvent>(document, "mouseup", mouseUpCallback);
  useEventListener<MouseEvent>(document, "mousemove", mouseMoveCallback);

  const startDragListening = useCallback(
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
    startDragListening,
  };
};

function useGenerateEventCallbacks(
  setMouseDownPivot: React.Dispatch<React.SetStateAction<number>>,
  direction: "clientY",
  setDragStart: React.Dispatch<React.SetStateAction<number>>,
  setDragDistance: React.Dispatch<React.SetStateAction<number>>,
  mouseDownPivot: number,
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  threshold: number,
  dragDistance: number,
  dragging: boolean,
  dragStartCalculator?: (e: Event) => number,
  onClick?: (e: MouseEvent) => void
) {
  const mouseDownCallback = useCallback(
    (e: MouseEvent) => {
      // console.log("setMouseDownPivot");
      // console.log("setDragStart");
      // console.log("setDragDistance");

      /**
       * On mousedown record it to check that mousedown actually happened on this element.
       * Record where the drag started
       * Reset the drag distance to zero.
       */
      setMouseDownPivot(e[direction]);
      setDragStart(
        (dragStartCalculator && dragStartCalculator(e)) || e.offsetY
      );
      setDragDistance(0);
    },
    [
      setDragStart,
      direction,
      setDragDistance,
      setMouseDownPivot,
      dragStartCalculator,
    ]
  );

  const mouseUpCallback = useCallback(
    (e: MouseEvent) => {
      // Check if mousedown happened in the context of the element
      if (mouseDownPivot !== -Infinity) {
        // console.log("setMouseDownPivot");
        // console.log("setDragStart");
        // console.log("setDragDistance");

        if (!dragging && dragDistance < threshold && onClick) {
          onClick(e);
        }
        /**
         * Reset dragging and mousedown coordinate
         * if a mouse down actually happened in the first place
         */
        setMouseDownPivot(-Infinity);
        setDragging(false);
        setDragDistance(0);
      }
    },
    [
      dragging,
      setDragging,
      mouseDownPivot,
      setMouseDownPivot,
      setDragDistance,
      dragDistance,
      threshold,
      onClick,
    ]
  );

  const mouseMoveCallback = useCallback(
    (e) => {
      // Check if mousedown happened in the context of the element
      if (mouseDownPivot !== -Infinity) {
        // console.log("setDragDistance");

        // If threshold exceeds mark it as dragging start
        if (Math.abs(e[direction] - mouseDownPivot) > threshold && !dragging) {
          console.log("setDragging");
          setDragging(true);
        }

        setDragDistance(e[direction] - mouseDownPivot);
      }
    },
    [
      setDragDistance,
      mouseDownPivot,
      threshold,
      direction,
      setDragging,
      dragging,
    ]
  );
  return { mouseUpCallback, mouseMoveCallback, mouseDownCallback };
}
