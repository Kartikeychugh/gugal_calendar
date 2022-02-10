import React, { useCallback, useState } from "react";
import { useEventListener } from "../use-event-listener";

export const useClickAndDragWatcher = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  direction: "movementY",
  onMovement?: (distanceFromTop: number) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);

  useEventListener(
    containerRef.current,
    "mousedown",
    useCallback(() => {
      setMouseDown(true);
    }, [setMouseDown])
  );

  useEventListener(
    document,
    "mouseup",
    useCallback(() => {
      if (mouseDown) {
        setMouseDown(false);
      }
    }, [mouseDown, setMouseDown])
  );

  useEventListener(
    document,
    "mousemove",
    useCallback(
      (e: Event) => {
        if (mouseDown && (e as MouseEvent).buttons !== 0) {
          onMovement && onMovement((e as MouseEvent)[direction]);
        }
      },
      [onMovement, mouseDown, direction]
    )
  );
};
