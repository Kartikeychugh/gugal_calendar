import { Box } from "@mui/material";
import { isSameDay, addHours, startOfToday } from "date-fns";
import { useContext } from "react";
import { CalendarDimensionsContext } from "../../..";
import { useCreateClientEvent } from "../../../../hooks/use-add-event";

export const CalendarGridColumn = (props: {
  lastColumn: boolean;
  datetime: Date;
  view: number;
}) => {
  const cells = [];
  const createClientEvent = useCreateClientEvent();
  const calendarDimensionsValue = useContext(CalendarDimensionsContext);
  for (let i = 0; i < 24; i++) {
    cells.push(
      <Box
        key={i}
        sx={{
          height: `${calendarDimensionsValue.cellHeight}px`,
          width: "100%",
          backgroundColor: `${
            isSameDay(props.datetime, startOfToday())
              ? "rgb(25, 118, 210, 0.07)"
              : "#ffffff"
          }`,
          transition: "0.2s all ease-in-out",
          borderRadius: "2px",
          boxShadow:
            i === 23
              ? props.lastColumn
                ? "none"
                : "inset -1px 0px 0px #e0e0e0"
              : props.lastColumn
              ? "inset 0px -1px 0px #e0e0e0"
              : "inset -1px -1px 0px #e0e0e0",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        }}
        onClick={(e) => {
          createClientEvent(
            addHours(props.datetime, i),
            addHours(props.datetime, i + 1)
          );
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
