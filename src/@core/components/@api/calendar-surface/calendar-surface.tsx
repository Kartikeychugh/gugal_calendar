import { CalendarGrid } from "../../@internal";
import { useRef } from "react";
import { CalendarSurfaceSizeWatcher } from "../calendar-surface-size-watcher";

export const CalendarSurface = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      <CalendarSurfaceSizeWatcher containerRef={containerRef}>
        <CalendarGrid />
      </CalendarSurfaceSizeWatcher>
    </div>
  );
};
