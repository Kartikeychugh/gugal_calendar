import { Box } from "@mui/material";
import { useContext } from "react";
import { CalendarDimensionsContext } from "../../../providers";

export const CalendarGridTime = () => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  const cells = [];
  for (let i = 0; i < 24; i++) {
    cells.push(<CalendarGridTimeCell key={i} hour={i} />);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: `${calendarDimensionsValue.timeGridWidth}px`,
      }}
    >
      {cells}
    </Box>
  );
};

const CalendarGridTimeCell = (props: { hour: number }) => {
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);

  const hour = props.hour > 12 ? props.hour - 12 : props.hour;
  const ampm = props.hour > 12 ? "PM" : "AM";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: `${calendarDimensionsValue.minCellHeight}px`,
        padding: "4px",
        // justifyContent: "center",
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
