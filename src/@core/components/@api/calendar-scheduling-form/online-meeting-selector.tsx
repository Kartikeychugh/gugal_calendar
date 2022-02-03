import { Box, Button } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { DefaultTheme, makeStyles } from "@mui/styles";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    "& .MuiButton-root": {
      marginLeft: "24px",
      fontSize: "11px",
      height: "fit-content",
      padding: "5px 11px",
      fontWeight: "600",
      fontStyle: "normal",
      borderRadius: "10px",
    },
    "& .MuiSvgIcon-root": {
      height: "24px",
      width: "24px",
    },
    marginTop: "32px",
    "& .MuiFormControl-root": { marginLeft: "24px" },
    "& .MuiOutlinedInput-input": { padding: "8px 7px" },
    display: "flex",
    alignItems: "center",
  },
});

export const OnlineMeetingToggle = (props: {
  onlineMeeting: boolean;
  toggleOnlineMeeting: () => void;
}) => {
  const { onlineMeeting, toggleOnlineMeeting } = props;
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <VideoCallIcon />
      <Button
        {...(!onlineMeeting
          ? { variant: "contained" }
          : { variant: "outlined" })}
        onClick={toggleOnlineMeeting}
      >
        {onlineMeeting
          ? "Remove Google Meet video conferencing"
          : "Add Google Meet video conferencing"}
      </Button>
    </Box>
  );
};
