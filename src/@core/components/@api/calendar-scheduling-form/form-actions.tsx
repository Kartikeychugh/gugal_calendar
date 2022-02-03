import { LoadingButton } from "@mui/lab";
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
  loading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const { loading, onCancel, onSubmit } = props;
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <LoadingButton
        variant="contained"
        loading={loading}
        loadingPosition="center"
        onClick={onSubmit}
      >
        Save
      </LoadingButton>
    </Box>
  );
};
