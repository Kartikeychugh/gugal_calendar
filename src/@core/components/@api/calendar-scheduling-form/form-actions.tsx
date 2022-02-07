import { Box, Button } from "@mui/material";
import { DefaultTheme, makeStyles } from "@mui/styles";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    marginTop: "48px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& .MuiButton-root": {
      marginLeft: "8px",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
});

export const FormActions = (props: {
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const { onCancel, onSubmit } = props;
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" onClick={onSubmit}>
        Save
      </Button>
    </Box>
  );
};
