import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSlideView, useSlideToToday } from "../../../../hooks";

export const CalendarViewSlider = () => {
  const slideView = useSlideView();
  const slideToToday = useSlideToToday();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          slideView(-1);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "30px",
          height: "30px",
          backgroundColor: "rgb(25, 118, 210, 0.07)",
          "& .MuiSvgIcon-root": {
            fill: "black",
            width: "14px",
          },
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          width: "70px",
          backgroundColor: "rgb(25, 118, 210, 0.07)",
          fontSize: "12px",
          color: "#18181B",
          ml: "2px",
          mr: "2px",
          fontWeight: "700",
        }}
        onClick={slideToToday}
      >
        Today
      </Button>
      <Button
        onClick={() => {
          slideView(1);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "30px",
          height: "30px",
          backgroundColor: "rgb(25, 118, 210, 0.07)",
          "& .MuiSvgIcon-root": {
            fill: "black",
            width: "14px",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};
