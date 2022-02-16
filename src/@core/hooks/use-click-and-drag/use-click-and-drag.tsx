import { useEffect, useRef, useState } from "react";
import { useDragWatcher } from "../use-drag-watcher";

export const useClickAndDrag = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  direction: "clientY"
) => {
  const ref = useRef<number>(0);

  const response = useDragWatcher(containerRef, direction);

  return response;
};
