import { Box } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useEventListener } from "../../../hooks";
import { useScrollBarStyles } from "./custom-scrollbar.styles";
import { convertToHeadTravel, convertToPageScroll } from "./scroll-bar.utils";
import { ScrollHead } from "./scroll-head";

export const Scrollbar = (props: {
  contentElement: HTMLElement | null;
  contentLength: number;
  windowLength: number;
}) => {
  const { contentElement, contentLength, windowLength } = props;
  const [scrollbarHover, setScrollbarHover] = useState(false);
  const [travel, setTravel] = useState<number>(0);
  const [scrolling, setScrolling] = useState(false);
  const classes = useScrollBarStyles();

  const scrollHeadHeight = useMemo(
    () => windowLength / (contentLength / windowLength),
    [windowLength, contentLength]
  );

  const scrollFactor = useMemo(
    () => (contentLength - windowLength) / (windowLength - scrollHeadHeight),
    [contentLength, windowLength, scrollHeadHeight]
  );

  const setScrollHeadTravel = useScrollByHeadTravelCallback(
    contentElement,
    travel,
    scrollHeadHeight,
    windowLength,
    scrollFactor
  );

  useEventListener(
    contentElement,
    "scroll",
    useScrollEventListenerCallback(
      setTravel,
      setScrolling,
      contentLength - windowLength,
      scrollFactor
    )
  );

  return (
    <Box
      sx={{
        position: "absolute",
        width: "10px",
        display: "flex",
        justifyContent: "center",
        top: `${contentElement?.offsetTop}px`,
        left: `${
          (contentElement?.offsetLeft || 0) +
          (contentElement?.offsetWidth || 0) -
          5
        }px`,
        height: `${contentElement?.offsetHeight}px`,
        "&:hover": {
          left: `${
            (contentElement?.offsetLeft || 0) +
            (contentElement?.offsetWidth || 0) -
            10
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
  );
};

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
      console.log("scrolling");

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
