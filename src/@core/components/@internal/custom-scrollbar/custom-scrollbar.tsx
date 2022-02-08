import { Box } from "@mui/material";
import {
  PropsWithChildren,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

import { useClickAndDragWatcher, useEventListener } from "../../../hooks";
import {
  useScrollBarStyles,
  useScrollHeadStyles,
} from "./custom-scrollbar.styles";

export const CustomScrollbar = (props: PropsWithChildren<{}>) => {
  const [child, setChild] = useState<HTMLElement | null>(null);
  const [windowLength, setWindowLength] = useState<number>(0);
  const [contentLength, setContentLength] = useState<number>(0);
  const [travel, setTravel] = useState<number>(0);

  const scrollHeadHeight = useMemo(
    () => windowLength / (contentLength / windowLength),
    [windowLength, contentLength]
  );

  const scrollFactor = useMemo(
    () => (contentLength - windowLength) / (windowLength - scrollHeadHeight),
    [contentLength, windowLength, scrollHeadHeight]
  );

  const scrollByHeadTravel = useScrollCallback(
    child,
    travel,
    scrollHeadHeight,
    windowLength,
    scrollFactor
  );

  useEventListener(
    child,
    "scroll",
    useScrollEventListenerCallback(
      setTravel,
      contentLength - windowLength,
      scrollFactor
    )
  );

  return (
    <Box
      ref={(node: any) => {
        if (node && node.children[0]) {
          setChild(node.children[0]);
          setWindowLength(node.children[0].clientHeight); // The window

          if (node.children[0].children[0]) {
            setContentLength(node.children[0].children[0].clientHeight); // The content
          }
        }
      }}
      sx={{
        overflow: "hidden",
        display: "flex",
        scrollbarWidth: "none",
        "& ::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {props.children}
      <Box sx={{ width: "10px", display: "flex", justifyContent: "center" }}>
        {contentLength > windowLength ? (
          <Scrollbar
            travel={travel}
            scrollHeadHeight={scrollHeadHeight}
            scrollByHeadTravel={scrollByHeadTravel}
          />
        ) : null}
      </Box>
    </Box>
  );
};

const Scrollbar = (props: {
  travel: number;
  scrollHeadHeight: number;
  scrollByHeadTravel: (newTravel: number, behavior: "auto" | "smooth") => void;
}) => {
  const classes = useScrollBarStyles();
  const { scrollHeadHeight, travel, scrollByHeadTravel } = props;

  return (
    <Box
      className={classes.root}
      onClick={(e) => {
        const newTravel = (e.nativeEvent as any).layerY;
        scrollByHeadTravel(newTravel, "smooth");
      }}
    >
      <ScrollHead
        scrollHeadHeight={scrollHeadHeight}
        travel={travel}
        scrollByHeadTravel={scrollByHeadTravel}
      />
    </Box>
  );
};

const ScrollHead = (props: {
  scrollHeadHeight: number;
  travel: number;
  scrollByHeadTravel: (newTravel: number, behavior: "auto" | "smooth") => void;
}) => {
  const { scrollHeadHeight, travel, scrollByHeadTravel } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickAndDragWatcher(
    containerRef,
    "movementY",
    useCallback(
      (movementY: number) => {
        scrollByHeadTravel(travel + movementY, "auto");
      },
      [scrollByHeadTravel, travel]
    )
  );

  const classes = useScrollHeadStyles({
    scrollHeadHeight,
    top: travel,
  });

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={containerRef}
      className={classes.root}
    />
  );
};

const useScrollEventListenerCallback = (
  setTravel: (travel: number) => void,
  maxScroll: number,
  scrollFactor: number
) => {
  let debouncer = useRef<number | undefined>(undefined);

  return useCallback(
    (ev: any) => {
      clearTimeout(debouncer.current);
      debouncer.current = setTimeout(() => {
        setTravel(
          Math.min(ev.target.scrollTop / scrollFactor, maxScroll / scrollFactor)
        );
      }, 0) as unknown as number;
    },
    [setTravel, debouncer, maxScroll, scrollFactor]
  );
};

const useScrollCallback = (
  child: HTMLElement | null,
  travel: number,
  scrollHeadHeight: number,
  windowLength: number,
  scrollFactor: number
) =>
  useCallback(
    (newTravel: number, behavior: "auto" | "smooth") => {
      if (child) {
        const diff = newTravel - (travel + scrollHeadHeight);
        const scroll = diff > 0 ? travel + diff : newTravel;

        if (scroll <= windowLength - scrollHeadHeight) {
          child.scrollTo({
            top: Math.min(
              scrollFactor * Math.min(scroll, windowLength - scrollHeadHeight)
            ),
            behavior,
          });
        }
      }
    },
    [windowLength, child, scrollFactor, scrollHeadHeight, travel]
  );
