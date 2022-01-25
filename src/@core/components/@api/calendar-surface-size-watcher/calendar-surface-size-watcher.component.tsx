import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CalendarViewContext } from "../../../providers";
import { useDispatch, useSelector } from "../../../../redux";

export const CalendarSurfaceSizeWatcher = (
  props: PropsWithChildren<{
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
  }>
) => {
  const { containerRef } = props;
  const { allViews, getView, setAvailableViews } =
    useContext(CalendarViewContext);
  const [lastBreakAt, setLastBreakAt] = useState<number | null>(null);
  const [firstUnAvailableViewId, setFirstUnAvailableViewId] = useState<number>(
    allViews.length
  );
  const {
    userView: { viewId: userViewId },
  } = useSelector((state) => state.view);
  // const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const currentUserView = getView(userViewId);

  useEffect(() => {
    if (firstUnAvailableViewId === -1) {
      setAvailableViews(allViews);
    } else {
      setAvailableViews(allViews.slice(0, firstUnAvailableViewId));
    }
  }, [firstUnAvailableViewId, allViews, setAvailableViews]);

  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width === null) {
        return;
      }

      const index = allViews.findIndex((view) => view.breakpoint > width);
      setFirstUnAvailableViewId(index);

      if (
        width <= currentUserView.breakpoint &&
        (lastBreakAt === null || lastBreakAt !== currentUserView.breakpoint)
      ) {
        dispatch({ type: "SET_RESPONSIVE_VIEW", payload: 0 });
        setLastBreakAt(currentUserView.breakpoint);
      } else if (width > currentUserView.breakpoint && lastBreakAt !== null) {
        dispatch({ type: "SET_RESPONSIVE_VIEW", payload: null });
        setLastBreakAt(null);
      }
    });
  }, [allViews, dispatch, currentUserView, lastBreakAt]);

  useEffect(() => {
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef, observer]);

  return <>{props.children}</>;
};
