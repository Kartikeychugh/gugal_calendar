import { Box, Typography, useTheme } from "@mui/material";
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
        backgroundImage: theme.palette?.backgroundImage?.light,
        color: "primary.light",
      }}
    >
      <Box
        sx={{
          fontSize: "12px",
          lineHeight: "16px",
        }}
      >
        <Typography variant="caption" fontWeight="600">
          {hour} {ampm}
        </Typography>
      </Box>
    </Box>
  );
};
