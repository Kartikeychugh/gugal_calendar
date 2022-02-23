import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContentRenderer } from "./content-renderer";
import { ScrollbarRenderer } from "./scrollbar.renderer";

export const Scrollbar = (
  props: PropsWithChildren<{
    scrollbarWidth?: number;
    overlay?: boolean;
  }>
) => {
  const { children, scrollbarWidth = 10, overlay = false } = props;

  validations(children);

  const [{ height, top, left }, setPosition] = useState(initialState());
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef<HTMLElement | null>();
  const contentRef = useRef<HTMLElement | null>();

  useContentHeightEffect(contentRef, setContentHeight);
  useScrollbarPositionEffect(containerRef, setPosition);

  return (
    <>
      <ContentRenderer
        ref={contentRef as any}
        containerRef={containerRef as any}
        scrollbarWidth={scrollbarWidth}
        content={children}
        overlay={overlay}
      />
      <ScrollbarRenderer
        ref={contentRef as any}
        top={top}
        left={left}
        width={scrollbarWidth}
        height={height}
        contentHeight={contentHeight}
        scrollbarWidth={scrollbarWidth}
      />
    </>
  );
};

const initialState = () => ({
  height: 0,
  top: 0,
  left: 0,
});

const useSetScrollbarPositionCallback = (
  setPosition: React.Dispatch<
    React.SetStateAction<{
      height: number;
      top: number;
      left: number;
    }>
  >
) =>
  useCallback(
    (element: HTMLElement) => {
      const {
        offsetTop,
        offsetLeft,
        clientLeft,
        clientHeight,
        clientWidth,
        clientTop,
      } = element;

      setPosition({
        height: Math.floor(clientHeight),
        top: Math.floor(offsetTop + clientTop),
        left: Math.floor(offsetLeft + clientLeft + clientWidth),
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
      left: number;
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

    const mutationObserver = new MutationObserver((entries) => {
      // Update custom scrollbar position
      setScrollbarPosition(entries[0].target as HTMLElement);
    });

    resizeObserver.observe(ref.current);
    mutationObserver.observe(ref.current, { attributes: true });
  }, [setScrollbarPosition, ref]);
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

    const mutationObserver = new MutationObserver((entries) => {
      // Update custom scrollbar position
      setContentHeight((entries[0].target as HTMLElement).scrollHeight);
    });

    resizeObserver.observe(contentRef.current);
    mutationObserver.observe(contentRef.current, { attributes: true });
  }, [contentRef, setContentHeight]);
};
