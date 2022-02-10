import { Box, useTheme } from "@mui/material";
import React, { useContext } from "react";
import {
  CalendarViewContext,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";

export const CalendarSurfaceGridColumn = React.memo(
  (props: {
    date: Date;
    onCellClick: (datetime: Date, hour: number) => void;
  }) => {
    const { endDateOfView } = useContext(CalendarViewContext);
    const cells = [];
    const { cellHeight } = useCalendarDimensionCellHeightContext();
    const theme = useTheme();
    for (let i = 0; i < 24; i++) {
      cells.push(
        <Box
          key={i}
          sx={{
            height: `${cellHeight}px`,
            width: "100%",
            transition: "0.2s all ease-in-out",
            borderRadius: "2px",
            // boxShadow: `${theme.shadows[1]}`,
            boxShadow:
              i === 23
                ? endDateOfView === props.date.valueOf()
                  ? "none"
                  : `inset -1px 0px  ${theme.palette.grey[400]}`
                : endDateOfView === props.date.valueOf()
                ? `inset 0px -1px  ${theme.palette.grey[400]}`
                : `inset -1px -1px  ${theme.palette.grey[400]}`,
            "&:hover": {
              backgroundColor: `action.hover`,
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
