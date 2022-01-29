import { Box } from "@mui/material";
import { isSameDay, startOfToday } from "date-fns";

export const CalendarSurfaceGridColumnReusable = (props: {
  isLastColumnInView: boolean;
  date: Date;
  minCellHeight: number;
  onCellClick: (datetime: Date, hour: number) => void;
}) => {
  const cells = [];

  for (let i = 0; i < 24; i++) {
    cells.push(
      <Box
        key={i}
        sx={{
          height: `${props.minCellHeight}px`,
          width: "100%",
          backgroundColor: `${
            isSameDay(props.date, startOfToday())
              ? "rgb(25, 118, 210, 0.07)"
              : "#ffffff"
          }`,
          transition: "0.2s all ease-in-out",
          borderRadius: "2px",
          boxShadow:
            i === 23
              ? props.isLastColumnInView
                ? "none"
                : "inset -1px 0px 0px #e0e0e0"
              : props.isLastColumnInView
              ? "inset 0px -1px 0px #e0e0e0"
              : "inset -1px -1px 0px #e0e0e0",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        }}
        onClick={(e) => {
          props.onCellClick(props.date, i);
        }}
      ></Box>
    );
  }
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {cells}
    </Box>
  );
};
