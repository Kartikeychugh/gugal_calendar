import { Box } from "@mui/material";
import { useScrollBarStyles } from "./custom-scrollbar.styles";
import { ScrollHead } from "./scroll-head";

export const Scrollbar = (props: {
  visible: boolean;
  setScrollbarHover: (value: boolean) => void;
  travel: number;
  scrollHeadHeight: number;
  setScrollHeadTravel: (newTravel: number, behavior: "auto" | "smooth") => void;
}) => {
  const classes = useScrollBarStyles();
  const {
    scrollHeadHeight,
    travel,
    setScrollHeadTravel,
    setScrollbarHover,
    visible,
  } = props;

  return (
    <Box
      className={classes.root}
      onClick={(e) => {
        setScrollHeadTravel(
          e.clientY - (e.target as HTMLElement).offsetTop,
          "smooth"
        );
      }}
      onMouseEnter={(e) => {
        setScrollbarHover(true);
      }}
      onMouseLeave={(e) => {
        setScrollbarHover(false);
      }}
    >
      <ScrollHead
        visible={visible}
        scrollHeadHeight={scrollHeadHeight}
        travel={travel}
        setScrollHeadTravel={setScrollHeadTravel}
      />
    </Box>
  );
};
