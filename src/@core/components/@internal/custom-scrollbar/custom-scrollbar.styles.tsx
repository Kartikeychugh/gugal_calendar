import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useScrollBarStyles = makeStyles<Theme>((theme) => ({
  root: {
    background: "transparent",
    width: "3px",
    // height: "100%",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      background: `${theme.palette?.action.focus}`,
      width: "10px",
    },
    transition: "0.1s all ease-in-out",
  },
}));

export const useScrollHeadStyles = makeStyles<
  Theme,
  { top: number; scrollHeadHeight: number },
  string
>((theme) => ({
  root: {
    position: "relative",
    top: (props) => `${props.top}px`,
    transition: "0s all ease-in-out",
    width: "100%",
    height: (props) => `${props.scrollHeadHeight}px`,
    background: `${theme.palette.primary.light}`,
    borderRadius: "5px",
    "&:hover": {
      opacity: `0.8`,
    },
  },
}));
