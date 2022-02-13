import { Box, useTheme } from "@mui/material";
import React, { useContext } from "react";
import {
  useCalendarViewManager,
  useCalendarDimensionCellHeightContext,
} from "../../../providers";

export const CalendarSurfaceGridColumn = React.memo(
  (props: {
    date: Date;
    onCellClick: (datetime: Date, hour: number) => void;
  }) => {
    const { viewDates } = useCalendarViewManager();
    const cells = [];
    const { cellHeight } = useCalendarDimensionCellHeightContext();
    const theme = useTheme();
    const endDateOfView = viewDates[viewDates.length - 1].valueOf();

    for (let i = 0; i < 24; i++) {
      cells.push(
        <Box
          key={i}
          sx={{
            height: `${cellHeight}px`,
            width: "100%",
            transition: "0.2s all ease-in-out",
            // borderRadius: "2px",
            boxShadow:
              i === 23
                ? endDateOfView === props.date.valueOf()
                  ? "none"
                  : `inset -1px 0px  ${
                      theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 300
                      ]
                    }`
                : endDateOfView === props.date.valueOf()
                ? `inset 0px -1px  ${
                    theme.palette.grey[
                      theme.palette.mode === "dark" ? 700 : 300
                    ]
                  }`
                : `inset -1px -1px  ${
                    theme.palette.grey[
                      theme.palette.mode === "dark" ? 700 : 300
                    ]
                  }`,
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
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        {cells}
      </Box>
    );
  }
);
