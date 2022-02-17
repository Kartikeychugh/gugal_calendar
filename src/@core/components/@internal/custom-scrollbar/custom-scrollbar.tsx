import { Box } from "@mui/material";
import {
  PropsWithChildren,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

import { useEventListener } from "../../../hooks";
import { Scrollbar } from "./scroll-bar";
import { convertToHeadTravel, convertToPageScroll } from "./scroll-bar.utils";

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
        height: "100%",
        overflow: "hidden",
        display: "flex",
        scrollbarWidth: "none",
        "& ::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {props.children}
      <Box
        sx={{
          width: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Scrollbar
          visible={scrolling || scrollbarHover}
          setScrollbarHover={setScrollbarHover}
          travel={travel}
          scrollHeadHeight={scrollHeadHeight}
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
