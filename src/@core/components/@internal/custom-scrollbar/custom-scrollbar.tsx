import { Box } from "@mui/material";
import {
  PropsWithChildren,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { useEventListener } from "../../../hooks";
import { useScrollBarStyles } from "./custom-scrollbar.styles";
import { Scrollbar } from "./scroll-bar";
import { convertToHeadTravel, convertToPageScroll } from "./scroll-bar.utils";
import { ScrollHead } from "./scroll-head";

export const CustomScrollbar = (props: PropsWithChildren<{}>) => {
  const [child, setChild] = useState<HTMLElement | null>(null);
  const [windowLength, setWindowLength] = useState<number>(0);
  const [contentLength, setContentLength] = useState<number>(0);
  const [travel, setTravel] = useState<number>(0);
  const [scrolling, setScrolling] = useState(false);
  const [scrollbarHover, setScrollbarHover] = useState(false);

  const scrollHeadHeight = useMemo(
    () => windowLength / (contentLength / windowLength),
    [windowLength, contentLength]
  );

  const scrollFactor = useMemo(
    () => (contentLength - windowLength) / (windowLength - scrollHeadHeight),
    [contentLength, windowLength, scrollHeadHeight]
  );

  const setScrollHeadTravel = useScrollByHeadTravelCallback(
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
      setScrolling,
      contentLength - windowLength,
      scrollFactor
    )
  );
  const classes = useScrollBarStyles();

  return (
    <Box
      ref={(node: HTMLDivElement) => {
        if (node && node.children[0]) {
          setChild(node.children[0] as HTMLElement);
          setWindowLength(node.clientHeight); // The window
          setContentLength(node.children[0].scrollHeight); // The content
        }
      }}
      sx={{
        height: "100%",
        overflow: "hidden",
        scrollbarWidth: "none",
        "& ::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {props.children}
      <Box
        sx={{
          position: "absolute",
          width: "10px",
          display: "flex",
          justifyContent: "center",
          top: `${child?.offsetTop}px`,
          left: `${(child?.offsetLeft || 0) + (child?.offsetWidth || 0) - 5}px`,
          height: `${child?.offsetHeight}px`,
          "&:hover": {
            left: `${
              (child?.offsetLeft || 0) + (child?.offsetWidth || 0) - 10
            }px`,
          },
        }}
        onClick={(e) => {
          setScrollHeadTravel(
            e.clientY - (e.target as HTMLElement).offsetTop,
            "smooth"
          );
        }}
        onMouseEnter={(e) => {
          setScrollbarHover(true);
        }}
        onMouseLeave={(e) => {
          setScrollbarHover(false);
        }}
        className={classes.root}
      >
        <ScrollHead
          visible={scrolling || scrollbarHover}
          scrollHeadHeight={scrollHeadHeight}
          travel={travel}
          setScrollHeadTravel={setScrollHeadTravel}
        />
      </Box>
    </Box>
  );
};

const useScrollByHeadTravelCallback = (
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

        if (scroll <= windowLength - scrollHeadHeight && scroll >= 0) {
          child.scrollTo({
            top: convertToPageScroll(
              Math.min(scroll, windowLength - scrollHeadHeight),
              scrollFactor
            ),
            behavior,
          });
        }
      }
    },
    [windowLength, child, scrollFactor, scrollHeadHeight, travel]
  );

const useScrollEventListenerCallback = (
  setTravel: (travel: number) => void,
  setVisible: (value: boolean) => void,
  maxScroll: number,
  scrollFactor: number
) => {
  const setVisibleDebouncer = useRef<number | undefined>(undefined);
  return useCallback(
    (ev: Event) => {
      if (!ev || !ev.target) {
        return;
      }

      clearTimeout(setVisibleDebouncer.current);
      setVisibleDebouncer.current = setTimeout(() => {
        setVisible(false);
      }, 1000) as unknown as number;

      setVisible(true);
      setTravel(
        Math.min(
          convertToHeadTravel(
            (ev.target as HTMLElement).scrollTop,
            scrollFactor
          ),
          convertToHeadTravel(maxScroll, scrollFactor)
        )
      );
    },
    [setVisible, setTravel, maxScroll, scrollFactor]
  );
};
