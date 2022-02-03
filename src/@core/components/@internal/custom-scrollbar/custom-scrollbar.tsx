import { Box } from "@mui/material";
import {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { makeStyles, DefaultTheme } from "@mui/styles";

const useScrollBarStyles = makeStyles({
  root: {
    background: "transparent",
    width: "5px",
    height: "100%",
    cursor: "pointer",
    "&:hover": {
      background: "lightgrey",
      width: "10px",
    },
  },
});

const useScrollHeadStyles = makeStyles<
  DefaultTheme,
  { top: number; scrollHeadHeight: number },
  string
>({
  root: {
    position: "relative",
    top: (props) => `${props.top}px`,
    transition: "0s all linear",
    width: "100%",
    height: (props) => `${props.scrollHeadHeight}px`,
    background: `lightblue`,
    borderRadius: "5px",
  },
});

export const CustomScrollbar = (props: PropsWithChildren<{}>) => {
  const [child, setChild] = useState<HTMLElement | undefined>(undefined);
  const [scrolledBy, setScrolledBy] = useState<number>(0);
  const [scrollCarpet, setScrollCarpet] = useState<number>(0);
  const [totalScrollCarpet, setTotalScrollCarpet] = useState<number>(0);

  let debouncer = useRef<number | undefined>(undefined);

  const scrollEventListenerCallback = useScrollEventListenerCallback(
    debouncer,
    setScrolledBy,
    totalScrollCarpet - scrollCarpet
  );

  useEffect(() => {
    const deb = debouncer.current;
    child && child.addEventListener("scroll", scrollEventListenerCallback);
    console.log({ child });

    return () => {
      console.log("removeEventListener");
      clearTimeout(deb);
      // child && child.removeEventListener("scroll", scrollEventListenerCallback);
    };
  }, [child, setScrolledBy, scrollEventListenerCallback]);

  console.log({});

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
      <Box sx={{ width: "10px", display: "flex", justifyContent: "center" }}>
        <Scrollbar
          child={child}
          totalScrollCarpet={totalScrollCarpet}
          scrollCarpet={scrollCarpet}
          scrollHeadHeight={scrollCarpet / (totalScrollCarpet / scrollCarpet)}
          scrolledBy={scrolledBy}
          setScrolledBy={setScrolledBy}
        />
      </Box>
    </Box>
  );
};

const Scrollbar = (props: {
  totalScrollCarpet: number;
  scrollHeadHeight: number;
  scrollCarpet: number;
  scrolledBy: number;
  setScrolledBy: (scrolledBy: number) => void;
  child: HTMLElement | undefined;
}) => {
  const classes = useScrollBarStyles();
  const { totalScrollCarpet, setScrolledBy, ...otherProps } = props;
  const k =
    (totalScrollCarpet - props.scrollCarpet) /
    (props.scrollCarpet - props.scrollHeadHeight);

  return totalScrollCarpet && props.child ? (
    <Box
      className={classes.root}
      onClick={(e) => {
        const m = (e.nativeEvent as any).layerY;
        if (props.child) {
          props.child.scrollTo({
            top: Math.min(k * m, totalScrollCarpet - props.scrollCarpet),
          });
        }
      }}
    >
      <ScrollHead {...otherProps} totalScrollCarpet={totalScrollCarpet} />
    </Box>
  ) : null;
};

const ScrollHead = (props: {
  scrollHeadHeight: number;
  scrollCarpet: number;
  scrolledBy: number;
  totalScrollCarpet: number;
  child: HTMLElement | undefined;
}) => {
  const { totalScrollCarpet, scrollHeadHeight, scrollCarpet, scrolledBy } =
    props;

  const k =
    (totalScrollCarpet - scrollCarpet) / (scrollCarpet - scrollHeadHeight);

  console.log();

  const top = scrolledBy / k;

  const classes = useScrollHeadStyles({ scrollHeadHeight, top });
  return scrollCarpet ? (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        const m = (e.nativeEvent as any).layerY;
        if (props.child) {
          props.child.scrollTo({
            top: Math.min(
              k * (m + top),
              totalScrollCarpet - props.scrollCarpet
            ),
          });
        }
        console.log({ m, scrolledBy });
      }}
      className={classes.root}
    />
  ) : null;
};

const useScrollEventListenerCallback = (
  debouncer: React.MutableRefObject<number | undefined>,
  setScrolledBy: (scrolledBy: number) => void,
  maxScroll: number
) => {
  return useCallback(
    (ev: any) => {
      clearTimeout(debouncer.current);
      debouncer.current = setTimeout(() => {
        setScrolledBy(Math.min(ev.target.scrollTop, maxScroll));
      }, 0) as unknown as number;
    },
    [setScrolledBy, debouncer, maxScroll]
  );
};
