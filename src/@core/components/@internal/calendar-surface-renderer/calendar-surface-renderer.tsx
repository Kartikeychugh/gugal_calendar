import { Box } from "@mui/material";
import { CalendarCommandBar } from "../../@api";
import { CalendarSurfaceScrollableGrid } from "../calendar-surface-grid";
import { CalendarSurfaceHeader } from "../calendar-surface-header";

export const CalendarSurfaceRenderer = (props: {
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
        <CalendarSurfaceScrollableGrid onCellClick={onCellClick} />
      </Box>
    </>
  );
};
