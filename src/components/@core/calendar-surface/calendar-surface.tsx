import { Paper } from "@mui/material";
import { CalendarGrid } from "../../calendar-grid/calendar-grid.component";
import { CalendarCommandBar } from "../calender-command-bar/calendar-command-bar.component";
import { CalendarSurfaceSizeWatcher } from "..";
import { CreateEventFormDialog } from "../../create-event-form/create-event-form-dialog";
import { useContext, useRef } from "react";
import { CalendarDimensionsContext } from "../../../contexts";

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
