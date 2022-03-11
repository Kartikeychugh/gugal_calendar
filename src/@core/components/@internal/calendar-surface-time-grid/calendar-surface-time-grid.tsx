import { Box, Typography, useTheme } from "@mui/material";
import { getHours } from "date-fns";
import { useCurrentTime } from "../../../hooks";
import { useCalendarDimensionCellHeightContext } from "../../../providers";

export const CalendarSurfaceTimeGrid = (props: {}) => {
  const { cellHeight } = useCalendarDimensionCellHeightContext();
  // const theme = useTheme();

  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <CalendarGridTimeCell key={i} hour={i} cellHeight={cellHeight} />
    );
  }
  return (
    <Box
      sx={{
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        minWidth: `60px`,
      }}
    >
      {cells}
    </Box>
  );
};

const CalendarGridTimeCell = (props: { hour: number; cellHeight: number }) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  const theme = useTheme();
  const time = useCurrentTime();
  const currentHour = getHours(time);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: `${props.cellHeight}px`,
        padding: "4px",
        boxShadow: `1px -1px  ${
          theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
        }`,
        color: currentHour === props.hour ? "primary.dark" : "primary.light",
        background:
          currentHour === props.hour
            ? theme.palette?.timeIndicatorGridHighlighter
            : "transparent",
        backgroundImage: theme.palette?.backgroundImage?.light,
      }}
    >
      <Box
        sx={{
          fontSize: "12px",
          lineHeight: "16px",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" fontWeight="600">
          {currentHour === props.hour
            ? new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : hour + " " + ampm}
        </Typography>
      </Box>
    </Box>
  );
};
