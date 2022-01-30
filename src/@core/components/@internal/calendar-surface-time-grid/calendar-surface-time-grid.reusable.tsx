import { Box } from "@mui/material";

export const CalendarSurfaceTimeGridReusable = (props: {
  dimensions: {
    cellHeight: number;
    timeGridWidth: number;
    columnWidth: number;
  };
}) => {
  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(
      <CalendarGridTimeCellReusable
        key={i}
        hour={i}
        dimensions={props.dimensions}
      />
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: `${props.dimensions.timeGridWidth}px`,
      }}
    >
      {cells}
    </Box>
  );
};

const CalendarGridTimeCellReusable = (props: {
  hour: number;
  dimensions: {
    cellHeight: number;
    timeGridWidth: number;
    columnWidth: number;
  };
}) => {
  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: `${props.dimensions.cellHeight}px`,
        padding: "4px",
      }}
    >
      <Box
        sx={{
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#71717a",
        }}
      >
        {hour} {ampm}
      </Box>
    </Box>
  );
};
