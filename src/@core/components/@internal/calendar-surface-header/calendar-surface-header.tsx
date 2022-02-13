import { Box, useTheme } from "@mui/material";
import { eachDayOfInterval, isSameDay, startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarViewContext } from "../../../providers";

export const CalendarSurfaceHeader = (props: {
  onHeaderClick: (date: number) => void;
}) => {
  const { onHeaderClick } = props;
  const { startDateOfView, endDateOfView, minColumnWidth } =
    useContext(CalendarViewContext);
  const currentDates = eachDayOfInterval({
    start: startDateOfView,
    end: endDateOfView,
  });
  const numberOfDays = currentDates.length;
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", height: "60px", display: "flex", pr: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px 8px 4px 8px",
          fontSize: "15px",
          fontWeight: 700,
          flexDirection: "column",
          minWidth: `60px`,
          boxShadow: `inset 0px -1px ${
            theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
          }, 1px 0px ${
            theme.palette.grey[theme.palette.mode === "dark" ? 700 : 300]
          }`,
          // backgroundImage: theme.palette.backgroundImage?.light,
        }}
      ></Box>
      {currentDates.map((date, i) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: `${minColumnWidth}px`,
              padding: "4px 8px 4px 8px",
              flexDirection: "column",
              width: `calc(${100 / numberOfDays}%)`,
              backgroundImage: isSameDay(new Date(date), startOfToday())
                ? theme.palette.backgroundImage?.main
                : theme.palette.backgroundImage?.light,
              color: "primary.light",
              boxShadow:
                i + 1 === numberOfDays
                  ? `inset 0px -1px 1px ${
                      theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 300
                      ]
                    }`
                  : `inset -1px -1px 1px ${
                      theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 300
                      ]
                    }`,
            }}
            onClick={() => onHeaderClick(date.valueOf())}
            key={i}
          >
            <Box
              sx={{
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "10px",
                lineHeight: "12px",
              }}
            >
              {new Date(date).toLocaleDateString("en-GB", { weekday: "short" })}
            </Box>
            <Box
              sx={{
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "32px",
                display: "flex",
              }}
            >
              <Box> {new Date(date).getDate()}</Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
