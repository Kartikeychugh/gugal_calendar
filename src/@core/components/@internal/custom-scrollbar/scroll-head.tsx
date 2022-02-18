import { Fade, Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useDragWatcher } from "../../..";
import { useScrollHeadStyles } from "./custom-scrollbar.styles";

export const ScrollHead = (props: {
  visible: boolean;
  scrollHeadHeight: number;
  travel: number;
  setScrollHeadTravel: (newTravel: number, behavior: "auto" | "smooth") => void;
}) => {
  const { scrollHeadHeight, travel, setScrollHeadTravel, visible } = props;
  const [dragPivot, setDragPivot] = useState(travel);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { startDragListening, dragDistance, dragging } = useDragWatcher(
    "clientY",
    0
  );

  useDragListener(startDragListening, containerRef);
  useSetDragPivot(dragging, setDragPivot, travel);
  useSetScrollHeadTravel(
    dragging,
    setScrollHeadTravel,
    dragPivot,
    dragDistance
  );

  const classes = useScrollHeadStyles({
    scrollHeadHeight,
    top: travel,
  });

  return (
    <Fade in={visible} timeout={500}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={containerRef}
        className={classes.root}
      />
    </Fade>
  );
};

function useDragListener(
  startListening: (element: Node | null) => () => void,
  containerRef: React.MutableRefObject<HTMLElement | null>
) {
  useEffect(() => {
    const stopListening = startListening(containerRef.current);
    return () => {
      stopListening();
    };
  }, [startListening, containerRef]);
}

function useSetScrollHeadTravel(
  dragging: any,
  scrollByHeadTravel: (newTravel: number, behavior: "auto" | "smooth") => void,
  dragPivot: number,
  dragDistance: any
) {
  useEffect(() => {
    if (dragging) {
      scrollByHeadTravel(dragPivot + dragDistance, "auto");
    }
  }, [dragDistance, scrollByHeadTravel, dragging, dragPivot]);
}

function useSetDragPivot(
  dragging: boolean,
  setDragPivot: (pivot: number) => void,
  travel: number
) {
  useEffect(() => {
    if (!dragging) {
      setDragPivot(travel);
    }
  }, [travel, dragging, setDragPivot]);
}
