import { Box } from "@mui/material";
import {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import { useCalendarEventDetails } from "../../../providers";

export const CustomScrollbar = (props: PropsWithChildren<{}>) => {
  const [child, setChild] = useState<HTMLElement | undefined>(undefined);
  const [scrolledBy, setScrolledBy] = useState<number>(0);
  const [scrollCarpet, setScrollCarpet] = useState<number>(0);
  const [totalScrollCarpet, setTotalScrollCarpet] = useState<number>(0);

  let debouncer = useRef<number | undefined>(undefined);

  const scrollEventListenerCallback = useScrollEventListenerCallback(
    debouncer,
    setScrolledBy
  );

  useLayoutEffect(() => {
    const deb = debouncer.current;
    child && child.addEventListener("scroll", scrollEventListenerCallback);
    return () => {
      clearTimeout(deb);
      child && child.removeEventListener("scroll", scrollEventListenerCallback);
    };
  }, [child, setScrolledBy, scrollEventListenerCallback]);

  const { scrollHeadHeight, areaToCoverOnScroll } = useMemo(
    () => ({
      scrollHeadHeight: scrollCarpet / (totalScrollCarpet / scrollCarpet),
      areaToCoverOnScroll: totalScrollCarpet - scrollCarpet,
    }),
    [totalScrollCarpet, scrollCarpet]
  );

  console.log({ k: totalScrollCarpet / (scrollCarpet - scrollHeadHeight) });

  return (
    <Box
      ref={(node: any) => {
        if (node) {
          setChild(node.children[0]);
          setScrollCarpet(node.children[0].clientHeight);
          setTotalScrollCarpet(node.children[0].children[0].clientHeight);
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
      <Scrollbar
        totalScrollCarpet={totalScrollCarpet}
        scrollCarpet={scrollCarpet}
        scrollHeadHeight={scrollHeadHeight}
        areaToCoverOnScroll={areaToCoverOnScroll}
        scrolledBy={scrolledBy}
        setScrolledBy={setScrolledBy}
      />
    </Box>
  );
};

const Scrollbar = (props: {
  totalScrollCarpet: number;
  scrollHeadHeight: number;
  scrollCarpet: number;
  areaToCoverOnScroll: number;
  scrolledBy: number;
  setScrolledBy: (scrolledBy: number) => void;
}) => {
  const { totalScrollCarpet, setScrolledBy, ...otherProps } = props;
  return totalScrollCarpet ? (
    <Box
      onClick={(e) => {}}
      sx={{
        cursor: "pointer",
        width: "5px",
        height: "100%",
        background: "transparent",
      }}
    >
      <ScrollHead {...otherProps} totalScrollCarpet={totalScrollCarpet} />
    </Box>
  ) : null;
};

const ScrollHead = (props: {
  scrollHeadHeight: number;
  scrollCarpet: number;
  areaToCoverOnScroll: number;
  scrolledBy: number;
  totalScrollCarpet: number;
}) => {
  const {
    totalScrollCarpet,
    scrollHeadHeight,
    scrollCarpet,
    areaToCoverOnScroll,
    scrolledBy,
  } = props;

  const k = totalScrollCarpet / (scrollCarpet - scrollHeadHeight);
  console.log({ travel: scrolledBy / k });
  console.log({
    travelCurrent:
      ((scrollCarpet - scrollHeadHeight) / areaToCoverOnScroll) * scrolledBy,
  });

  return scrollCarpet ? (
    <Box
      sx={{
        position: "relative",
        top: `${
          ((scrollCarpet - scrollHeadHeight) / areaToCoverOnScroll) * scrolledBy
        }px`,
        transitionDuration: "0",
        transitionProperty: "top",
        transitionTimingFunction: "ease-in-out",
        width: "100%",
        height: `${scrollHeadHeight}px`,
        background: `lightblue`,
        borderRadius: "5px",
      }}
    />
  ) : null;
};

const useScrollEventListenerCallback = (
  debouncer: React.MutableRefObject<number | undefined>,
  setScrolledBy: (scrolledBy: number) => void
) => {
  return useCallback(
    (ev: any) => {
      clearTimeout(debouncer.current);
      debouncer.current = setTimeout(() => {
        setScrolledBy(ev.target.scrollTop);
      }, 0) as unknown as number;
    },
    [setScrolledBy, debouncer]
  );
};
