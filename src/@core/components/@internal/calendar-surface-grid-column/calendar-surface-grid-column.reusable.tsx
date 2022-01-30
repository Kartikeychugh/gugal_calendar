import { Box } from "@mui/material";
import React from "react";

export const CalendarSurfaceGridColumnReusable = React.memo(
  (props: {
    isLastColumnInView: boolean;
    date: Date;
    minCellHeight: number;
    onCellClick: (datetime: Date, hour: number) => void;
  }) => {
    const cells = [];

    for (let i = 0; i < 24; i++) {
      console.log({ minCellHeight: props.minCellHeight });

      cells.push(
        <Box
          key={i}
          sx={{
            height: `${props.minCellHeight}px`,
            width: "100%",
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
          // display: "flex",
          // flexDirection: "column",
          width: "100%",
        }}
      >
        {cells}
      </Box>
    );
  }
);
