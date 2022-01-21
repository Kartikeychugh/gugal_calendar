import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSlideView, useSlideToToday } from "../../hooks/use-slide-view";

export const CalendarViewSlider = () => {
  const slideView = useSlideView();
  const slideToToday = useSlideToToday();
  return (
    <Box
      sx={{
        ml: "100px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
      <Button
        onClick={() => {
          slideView(-1);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "30px",
          height: "30px",
          backgroundColor: "#F4F4F5",
          "& .MuiSvgIcon-root": {
            fill: "black",
            width: "14px",
          },
        }}>
        <ArrowBackIosIcon />
      </Button>
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          width: "70px",
          backgroundColor: "#F4F4F5",
          fontSize: "12px",
          color: "#18181B",
          ml: "2px",
          mr: "2px",
          fontWeight: "700",
        }}
        onClick={slideToToday}>
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
          width: "30px",
          height: "30px",
          backgroundColor: "#F4F4F5",
          "& .MuiSvgIcon-root": {
            fill: "black",
            width: "14px",
          },
        }}>
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};
