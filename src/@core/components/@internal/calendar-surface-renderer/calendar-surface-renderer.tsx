import { Box } from "@mui/material";
import { ICalendarEventItem } from "../../../models";
import { useCalendarFeatureFlags } from "../../../providers";
import { CalendarSurfaceScrollableGrid } from "../calendar-surface-grid";
import { CalendarSurfaceHeader } from "../calendar-surface-header";
import { CalendarCommandBar } from "../calender-command-bar";

export const CalendarSurfaceRenderer = (props: {
  onHeaderClick: (date: number) => void;
  onCellClick: (start: Date, end: Date) => void;
  CientEventCard?: (props: { event: ICalendarEventItem }) => JSX.Element;
}) => {
  const { onHeaderClick, onCellClick, CientEventCard } = props;
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
          CientEventCard={CientEventCard}
        />
      </Box>
    </>
  );
};
