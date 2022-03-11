import { Box, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { useCalendarViewManager } from "../../..";

export const CalendarGridCell = React.memo(
  (props: { cellHeight: number; date: Date; i: number }) => {
    const { cellHeight, i } = props;
    const theme = useTheme();
    const { viewDates } = useCalendarViewManager();
    const endDateOfView = viewDates[viewDates.length - 1].valueOf();
    const ref = useRef<HTMLDivElement>(null);

    return (
      <Box
        data-key={i}
        ref={ref}
        key={i}
        sx={{
          height: `${cellHeight}px`,
          width: "100%",
          transition: "0.2s all ease-in-out",
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
                  theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
                }`
              : `inset -1px -1px  ${
                  theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
                }`,
          "&:hover": {
            backgroundColor: `action.hover`,
          },
        }}
      />
    );
  }
);
