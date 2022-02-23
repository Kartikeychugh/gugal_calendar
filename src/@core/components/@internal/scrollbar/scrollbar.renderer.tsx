import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDragWatcher } from "../../../hooks";

import "./scrollbar.css";
import {
  convertHeadTravelToScrollTravel,
  convertScrollTravelToHeadTravel,
} from "./utils";

export const ScrollbarRenderer = React.forwardRef<
  React.MutableRefObject<HTMLElement | null | undefined>,
  {
    top: number;
    left: number;
    width: number;
    height: number;
    contentHeight: number;
    scrollbarWidth: number;
  }
>((props, scrollableContentRef) => {
  const { top, left, height, contentHeight, scrollbarWidth } = props;
  const [scrollTravel, setScrollTravel] = useState(0);
  const scrollHeadRef = useRef<HTMLElement | null>();

  const scrollHeadLength = useMemo(
    () => height / (contentHeight / height),
    [height, contentHeight]
  );

  const scrollFactor = useMemo(
    () => (contentHeight - height) / (height - scrollHeadLength),
    [height, contentHeight, scrollHeadLength]
  );

  useScrollHeadDragEffect(
    scrollTravel,
    scrollHeadRef,
    scrollFactor,
    scrollableContentRef
  );

  useScrollEffect(scrollableContentRef, setScrollTravel);

  return (
    <div
      className="scrollbar"
      onClick={onScrollbarClick(
        top,
        scrollTravel,
        scrollFactor,
        scrollHeadLength,
        scrollableContentRef,
        height
      )}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left - scrollbarWidth}px`,

        width: `${scrollbarWidth}px`,
        height: `${height}px`,

        visibility: contentHeight > height ? "visible" : "hidden",
      }}
    >
      <div
        ref={scrollHeadRef as any}
        style={{
          position: "relative",
          top: `${convertScrollTravelToHeadTravel(
            scrollTravel,
            scrollFactor
          )}px`,
          height: `${scrollHeadLength}px`,
          width: "inherit",
          background: "green",
        }}
      ></div>
    </div>
  );
});

const onScrollbarClick =
  (
    top: number,
    scrollTravel: number,
    scrollFactor: number,
    scrollHeadLength: number,
    ref: React.ForwardedRef<
      React.MutableRefObject<HTMLElement | null | undefined>
    >,
    height: number
  ): React.MouseEventHandler<HTMLDivElement> | undefined =>
  (e) => {
    const scrollbarLevelClicked = e.clientY - top;
    const scrollbarHeadUpperLevel = convertScrollTravelToHeadTravel(
      scrollTravel,
      scrollFactor
    );
    const scrollbarHeadLowerLevel =
      convertScrollTravelToHeadTravel(scrollTravel, scrollFactor) +
      scrollHeadLength;

    const pageSize = height / 2;
    if (scrollbarLevelClicked < scrollbarHeadUpperLevel) {
      (
        ref as React.MutableRefObject<HTMLElement | null | undefined>
      ).current?.scrollBy({
        top: convertHeadTravelToScrollTravel(-pageSize, scrollFactor),
      });
    } else if (scrollbarLevelClicked > scrollbarHeadLowerLevel) {
      (
        ref as React.MutableRefObject<HTMLElement | null | undefined>
      ).current?.scrollBy({
        top: convertHeadTravelToScrollTravel(pageSize, scrollFactor),
      });
    } else {
    }
  };

const useScrollEffect = (
  scrollableContentRef: React.ForwardedRef<
    React.MutableRefObject<HTMLElement | null | undefined>
  >,
  setScrollTravel: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    if (
      !scrollableContentRef ||
      !(
        scrollableContentRef as React.MutableRefObject<
          HTMLElement | null | undefined
        >
      ).current
    ) {
      return;
    }

    const { current } = scrollableContentRef as React.MutableRefObject<
      HTMLElement | null | undefined
    >;

    current?.addEventListener("scroll", (e) => {
      setScrollTravel((e.target as HTMLElement).scrollTop);
    });
  }, [scrollableContentRef, setScrollTravel]);
};

const useScrollHeadDragEffect = (
  scrollTravel: number,
  scrollHeadRef: React.MutableRefObject<HTMLElement | null | undefined>,
  scrollFactor: number,
  ref: React.ForwardedRef<
    React.MutableRefObject<HTMLElement | null | undefined>
  >
) => {
  const [pivotScrollTravel, setPivotScrollTravel] = useState(0);
  const { startDragListening, dragDistance, dragging } = useDragWatcher(
    "clientY",
    0
  );

  // Record Pivot
  useEffect(() => {
    if (!dragging) {
      setPivotScrollTravel(scrollTravel);
    }
  }, [dragging, scrollTravel]);

  // start listening to drag event
  useEffect(() => {
    const stopListening = startDragListening(scrollHeadRef.current as any);
    return () => {
      stopListening();
    };
  }, [startDragListening, scrollHeadRef]);

  // Scroll content on drag
  useEffect(() => {
    if (!dragging) {
      return;
    }

    const scrolldistance =
      pivotScrollTravel +
      convertHeadTravelToScrollTravel(dragDistance, scrollFactor);

    (
      ref as React.MutableRefObject<HTMLElement | null | undefined>
    ).current?.scrollTo({
      top: scrolldistance,
    });
  }, [dragDistance, dragging, scrollFactor, pivotScrollTravel, ref]);
};
