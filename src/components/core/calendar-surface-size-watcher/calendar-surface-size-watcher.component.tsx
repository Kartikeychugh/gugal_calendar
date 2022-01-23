import { Box } from "@mui/material";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useDispatch } from "../../../redux/hooks/use-dispatch";

export const CalendarSurfaceSizeWatcher = (props: PropsWithChildren<{}>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const observer = new ResizeObserver((entries) => {
    console.log(entries[0].contentRect.width);
    if (entries[0].contentRect.width < 600) {
      dispatch({ type: "SET_RESPONSIVE_VIEW", payload: 0 });
    } else {
      dispatch({ type: "SET_RESPONSIVE_VIEW", payload: null });
    }
  });

  useEffect(() => {
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
  }, [containerRef]);

  return (
    <Box sx={{ width: "100%", ml: 1 }} ref={containerRef}>
      {props.children}
    </Box>
  );
};
