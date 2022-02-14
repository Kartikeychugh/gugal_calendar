import { Box } from "@mui/material";
import { ICalendarEventItem } from "../../../models";
import { useCalendarFeatureFlags } from "../../../providers";
import { CalendarSurfaceScrollableGrid } from "../calendar-surface-grid";
import { CalendarSurfaceHeader } from "../calendar-surface-header";
import { CalendarCommandBar } from "../calender-command-bar";

export const CalendarSurfaceRenderer = (props: {
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  RenderEventCard: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const { onHeaderClick, onCellClick, RenderEventCard } = props;
  const { hideCommandBar } = useCalendarFeatureFlags();
  return (
    <>
      {!!hideCommandBar ? null : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "30px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CalendarCommandBar />
        </Box>
      )}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: `calc(100% - ${hideCommandBar ? 0 : 46}px)`,
        }}
      >
        <CalendarSurfaceHeader onHeaderClick={onHeaderClick} />
        <CalendarSurfaceScrollableGrid
          onCellClick={onCellClick}
          RenderEventCard={RenderEventCard}
        />
      </Box>
    </>
  );
};
