import { Box } from "@mui/material";
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CalendarViewContext } from "../../../contexts/calendar-view/calendar-view.context";
import { useDispatch } from "../../../redux/hooks/use-dispatch";
import { useSelector } from "../../../redux/hooks/use-selector";

export const CalendarSurfaceSizeWatcher = (props: PropsWithChildren<{}>) => {
  const [width, setWidth] = useState<number | null>(null);
  const [breakAt, setBreakAt] = useState<number | null>(null);
  const {
    userView: { viewId: userViewId },
  } = useSelector((state) => state.view);
  const { getView, setBreakAt: _setBreakAt } = useContext(CalendarViewContext);
  const currentView = getView(userViewId);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      setWidth(newWidth);
    });
  }, [setWidth]);

  useEffect(() => {
    if (width === null) {
      return;
    }

    if (width < currentView.breakpoint && breakAt === null) {
      console.log("Surface:", "Control to responseView");
      dispatch({ type: "SET_RESPONSIVE_VIEW", payload: 0 });
      setBreakAt(currentView.breakpoint);
      _setBreakAt(currentView.breakpoint);
    } else if (width >= currentView.breakpoint && breakAt !== null) {
      console.log("Surface:", "Control to userView");
      dispatch({ type: "SET_RESPONSIVE_VIEW", payload: null });
      setBreakAt(null);
      _setBreakAt(null);
    }
  }, [dispatch, width, currentView, breakAt, _setBreakAt]);

  useEffect(() => {
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef, observer]);

  return (
    <Box sx={{ width: "100%", ml: 1 }} ref={containerRef}>
      {props.children}
    </Box>
  );
};
