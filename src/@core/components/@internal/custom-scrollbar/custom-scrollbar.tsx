import { Box } from "@mui/material";
import { PropsWithChildren, useState } from "react";

import { Scrollbar } from "./scroll-bar";

export const CustomScrollbar = (props: PropsWithChildren<{}>) => {
  const [contentElement, setContentElement] = useState<HTMLElement | null>(
    null
  );
  const [windowLength, setWindowLength] = useState<number>(0);
  const [contentLength, setContentLength] = useState<number>(0);

  return (
    <>
      <Box
        ref={(node: HTMLDivElement) => {
          if (node && node.firstChild) {
            setContentElement(node.firstElementChild as HTMLElement);
            setContentLength(node.firstElementChild?.scrollHeight || 0); // The content (props.children)
            setWindowLength(node.clientHeight); // The window
          }
        }}
        sx={{
          overflow: "hidden",
          scrollbarWidth: "none",
          "& ::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {props.children}
      </Box>
      <Scrollbar
        contentLength={contentLength}
        contentElement={contentElement}
        windowLength={windowLength}
      />
    </>
  );
};
