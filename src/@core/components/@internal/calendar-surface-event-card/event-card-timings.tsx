import { Typography } from "@mui/material";
import { FluidText } from "../../@api";

export const EventCardTimings = (props: {
  start: string | number | Date;
  end: string | number | Date;
}) => {
  const { start, end } = props;
  return (
    <Typography
      letterSpacing={0}
      fontWeight="bold"
      fontSize={"10px"}
      variant="caption"
      width={`100%`}
    >
      <FluidText minFontPercentage={90}>
        {new Date(start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        {" - "}
        {new Date(end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </FluidText>
    </Typography>
  );
};
