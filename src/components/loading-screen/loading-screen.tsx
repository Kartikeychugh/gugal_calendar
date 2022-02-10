import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingScreen = () => {
  return (
    <Backdrop
      sx={{
        // color: "#1976d2",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
