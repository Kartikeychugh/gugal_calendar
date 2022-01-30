import { Box } from "@mui/material";
import React, { useContext } from "react";
import { CalendarViewContext } from "../../../providers";

export const CalendarSurfaceGridColumn = React.memo(
  (props: {
    date: Date;
    onCellClick: (datetime: Date, hour: number) => void;
  }) => {
    const {
      dimensions: { cellHeight },
      endDateOfView,
    } = useContext(CalendarViewContext);
    const cells = [];

    for (let i = 0; i < 24; i++) {
      cells.push(
        <Box
          key={i}
          sx={{
            height: `${cellHeight}px`,
            width: "100%",
            transition: "0.2s all ease-in-out",
            borderRadius: "2px",
            boxShadow:
              i === 23
                ? endDateOfView === props.date.valueOf()
                  ? "none"
                  : "inset -1px 0px 0px #e0e0e0"
                : endDateOfView === props.date.valueOf()
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
          width: "100%",
        }}
      >
        {cells}
      </Box>
    );
  }
);
