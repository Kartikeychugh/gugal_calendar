import React, { useCallback, useState } from "react";
import { useEventListener } from "../use-event-listener";

export const useDragWatcher = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  direction: "clientY",
  threshold = 2
) => {
  const [mouseDownPivot, setMouseDownPivot] = useState(-Infinity);

  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(-1);
  const [dragDistance, setDragDistance] = useState(0);

  useEventListener(
    containerRef.current,
    "mousedown",
    useCallback(
      (e) => {
        setMouseDownPivot((e as MouseEvent)[direction]);
        setDragStart((e as any).layerY);
        setDragDistance(0);
      },
      [setDragStart, direction]
    )
  );

  useEventListener(
    document,
    "mouseup",
    useCallback(() => {
      setMouseDownPivot(-Infinity);
      setDragging(false);
    }, [setDragging])
  );

  useEventListener(
    document,
    "mousemove",
    useCallback(
      (e) => {
        if (mouseDownPivot !== -Infinity && (e as MouseEvent).buttons !== 0) {
          if (
            Math.abs((e as MouseEvent)[direction] - mouseDownPivot) > threshold
          ) {
            setDragging(true);
          }

          setDragDistance((e as MouseEvent)[direction] - mouseDownPivot);
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
