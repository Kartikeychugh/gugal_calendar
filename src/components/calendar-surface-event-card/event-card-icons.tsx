import { Box } from "@mui/material";

export const EventCardIcons = (props: { icons: JSX.Element[] }) => {
  const { icons } = props;
  return <Box sx={{ display: "flex" }}>{icons}</Box>;
};
