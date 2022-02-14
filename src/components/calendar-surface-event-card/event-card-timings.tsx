import { Typography } from "@mui/material";
import { ICalendarEventItem } from "../../@core";
import { FluidText } from "../fluid-text/fluid-text";

export const EventCardTimings = (props: { event: ICalendarEventItem }) => {
  const { event } = props;
  return (
    <Typography
      letterSpacing={0}
      fontWeight="bold"
      fontSize={"10px"}
      variant="caption"
      width={`100%`}
    >
      <FluidText minFontPercentage={90}>
        {new Date(event.start.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        {" - "}
        {new Date(event.end.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </FluidText>
    </Typography>
  );
};
