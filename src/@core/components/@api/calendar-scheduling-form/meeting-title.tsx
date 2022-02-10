import { TextField, Box } from "@mui/material";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import { DefaultTheme, makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    marginTop: "8px",
    "& .MuiOutlinedInput-notchedOutline": { right: "50px" },
    "& .MuiSvgIcon-root": {
      width: "24px",
      top: "7px",
      position: "relative",
    },
    display: "flex",
    alignItems: "center",
    "& .MuiInputLabel-root.Mui-focused": {
      // color: "#1976d2",
    },
    "& .MuiInput-root:after": {
      borderBottomColor: "#1976d2",
    },
  },
  text: {
    marginLeft: "24px",
  },
});

export const MeetingTitle = (props: {
  meetingTitle: string;
  setMeetingTitle: (title: string) => void;
}) => {
  const { meetingTitle, setMeetingTitle } = props;
  const [value, setValue] = useState(meetingTitle);
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <ArticleRoundedIcon />
      <TextField
        onBlur={() => {
          setMeetingTitle(value);
        }}
        className={classes.text}
        autoComplete="off"
        fullWidth
        id="standard-basic"
        label="Add title"
        variant="standard"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </Box>
  );
};
