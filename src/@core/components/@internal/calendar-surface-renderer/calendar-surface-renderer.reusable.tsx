import { Box } from "@mui/material";
import { CalendarCommandBarReusable } from "../../@api/calender-command-bar/calendar-command-bar.component.reusable";
import { CalendarSurfaceScrollableGridReusable } from "../calendar-surface-grid/calendar-surface-grid.component.reusable";
import { CalendarSurfaceHeaderReusable } from "../calendar-surface-header/calendar-surface-header.reusable";

export const CalendarSurfaceRendererResuable = (props: {
  onHeaderClick: (date: number) => void;
  onCellClick: (date: Date, hour: number) => void;
  hideCommandBar: boolean;
}) => {
  const { onHeaderClick, onCellClick, hideCommandBar } = props;

  return (
    <>
      {hideCommandBar ? null : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "30px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CalendarCommandBarReusable />
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
        <CalendarSurfaceHeaderReusable onHeaderClick={onHeaderClick} />
        <CalendarSurfaceScrollableGridReusable onCellClick={onCellClick} />
      </Box>
    </>
  );
};
