import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContentRenderer } from "./content-renderer";
import { ScrollbarRenderer } from "./scrollbar.renderer";

export const MyScrollbar = (
  props: PropsWithChildren<{
    scrollbarWidth?: number;
    overlay?: boolean;
    style?: React.CSSProperties | undefined;
  }>
) => {
  const { children, scrollbarWidth = 10, overlay = false, style = {} } = props;

  validations(children);

  const [{ height, top, clientLeft }, setPosition] = useState(initialState());
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLElement | null>();

  useContentHeightEffect(contentRef, setContentHeight);
  useScrollbarPositionEffect(contentRef, setPosition);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <ContentRenderer style={style} ref={contentRef as any}>
        {children}
      </ContentRenderer>
      <ScrollbarRenderer
        ref={contentRef as any}
        top={top}
        height={height}
        right={overlay ? clientLeft : -scrollbarWidth}
        contentHeight={contentHeight}
        scrollbarWidth={scrollbarWidth}
      />
    </div>
  );
};

const initialState = () => ({
  height: 0,
  top: 0,
  clientLeft: 0,
});

const useSetScrollbarPositionCallback = (
  setPosition: React.Dispatch<
    React.SetStateAction<{
      height: number;
      top: number;
      clientLeft: number;
    }>
  >
) =>
  useCallback(
    (element: HTMLElement) => {
      const { offsetTop, clientLeft, clientHeight, clientTop } = element;

      setPosition({
        height: Math.floor(clientHeight),
        top: Math.floor(offsetTop + clientTop),
        clientLeft: Math.floor(clientLeft),
      });
    },
    [setPosition]
  );

const useScrollbarPositionEffect = (
  ref: React.MutableRefObject<HTMLElement | null | undefined>,
  setPosition: React.Dispatch<
    React.SetStateAction<{
      height: number;
      top: number;
      clientLeft: number;
    }>
  >
) => {
  const setScrollbarPosition = useSetScrollbarPositionCallback(setPosition);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Initial custom scrollbar position
    setScrollbarPosition(ref.current);

    const resizeObserver = new ResizeObserver((entries) => {
      // Update custom scrollbar position
      setScrollbarPosition(entries[0].target as HTMLElement);
    });

    resizeObserver.observe(ref.current);
  }, [setScrollbarPosition, ref]);
};

const useContentHeightEffect = (
  contentRef: React.MutableRefObject<HTMLElement | null | undefined>,
  setContentHeight: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    setContentHeight((contentRef.current as HTMLElement).scrollHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      // Update custom scrollbar position
      setContentHeight((entries[0].target as HTMLElement).scrollHeight);
    });

    resizeObserver.observe(contentRef.current);
  }, [contentRef, setContentHeight]);
};

const validations = (
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) => {
  try {
    React.Children.only(children);
  } catch (e) {
    throw Error("Please add a single child under Scrollbar component");
  }

  try {
    React.isValidElement(children);
  } catch (e) {
    throw Error("Please add a valid child under Scrollbar component");
  }
};
