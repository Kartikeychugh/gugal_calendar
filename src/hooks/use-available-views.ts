import { useMediaQuery } from "@mui/material";

export const useAvailableView = () => {
  const matchesMinWidth900 = useMediaQuery("(min-width:900px)");
  const matchesMinWidth1200 = useMediaQuery("(min-width:1200px)");

  if (matchesMinWidth1200) {
    return [0, 1, 2];
  } else if (matchesMinWidth900) {
    return [0, 1];
  } else {
    return [0];
  }
};
