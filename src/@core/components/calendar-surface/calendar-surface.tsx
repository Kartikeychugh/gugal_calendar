import { CalendarGrid } from "../../../components/calendar-grid/calendar-grid.component";
import { CreateEventFormDialog } from "../../../components/create-event-form/create-event-form-dialog";
import { useRef } from "react";
import { CalendarSurfaceSizeWatcher } from "../calendar-surface-size-watcher/calendar-surface-size-watcher.component";

export const CalendarSurface = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      <CalendarSurfaceSizeWatcher containerRef={containerRef}>
        <CalendarGrid />
        <CreateEventFormDialog />
      </CalendarSurfaceSizeWatcher>
    </div>
  );
};
