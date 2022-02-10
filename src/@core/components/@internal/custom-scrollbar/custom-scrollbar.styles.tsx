import { makeStyles, DefaultTheme } from "@mui/styles";

export const useScrollBarStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
    width: "3px",
    height: "100%",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      background: `${(theme as any).palette.action.focus}`,
      width: "20px",
    },
    transition: "0.1s all ease-in-out",
  },
}));

export const useScrollHeadStyles = makeStyles<
  DefaultTheme,
  { top: number; scrollHeadHeight: number },
  string
>((theme) => ({
  root: {
    position: "relative",
    top: (props) => `${props.top}px`,
    transition: "0s all ease-in-out",
    width: "100%",
    height: (props) => `${props.scrollHeadHeight}px`,
    background: `${(theme as any).palette.primary.main}`,
    borderRadius: "5px",
    "&:hover": {
      opacity: `0.8`,
    },
  },
}));
