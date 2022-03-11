import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DefaultTheme, makeStyles } from "@mui/styles";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    marginTop: "32px",
    "& .MuiFormControl-root": { marginLeft: "24px" },
    "& .MuiOutlinedInput-input": { padding: "8px 7px", fontSize: "13px" },
    display: "flex",
    alignItems: "center",
  },
  accessTimeIcon: {
    // color: "#5f6368",
    // fill: "#5f6368",
  },
});

export const DateTimeSelector = (props: {
  startTime: string | Date;
  endTime: string | Date;
  onDateChange: (newValue: Date | null) => void;
  onStartTimeChange: (newValue: Date | null) => void;
  onEndTimeChange: (newValue: Date | null) => void;
}) => {
  const {
    startTime,
    endTime,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
  } = props;
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <AccessTimeIcon className={classes.accessTimeIcon} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="On"
          value={startTime}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="From"
          value={new Date(startTime)}
          onChange={onStartTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />

        <TimePicker
          label="To"
          value={new Date(endTime)}
          onChange={onEndTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};
