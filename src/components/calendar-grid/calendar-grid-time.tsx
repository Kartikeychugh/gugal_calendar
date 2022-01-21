import { Box } from "@mui/material";

export const CalendarGridTime = (props: {
  cellSize: number;
  timeGridWidth: number;
}) => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <CalendarGridTimeCell cellSize={props.cellSize} key={i} hour={i} />
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: `${props.timeGridWidth}px`,
      }}>
      {cells}
    </Box>
  );
};

const CalendarGridTimeCell = (props: { hour: number; cellSize: number }) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: `${props.cellSize}px`,
        padding: "4px",
        // justifyContent: "center",
      }}>
      <Box
        sx={{
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#71717a",
        }}>
        {hour} {ampm}
      </Box>
    </Box>
  );
};
