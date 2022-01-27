import { PropsWithChildren, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "../../../../redux";
import { useCalendarView, useSizeWatcher } from "../../../hooks";

export const CalendarSurfaceSizeWatcher = (
  props: PropsWithChildren<{
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
  }>
) => {
  const { containerRef } = props;
  const { allViews, getView, setAvailableViews } = useCalendarView();
  const [lastBreakAt, setLastBreakAt] = useState<number | null>(null);
  const [firstUnAvailableViewId, setFirstUnAvailableViewId] = useState<number>(
    allViews.length
  );
  const {
    userView: { viewId: userViewId },
  } = useSelector((state) => state.view);
  const width = useSizeWatcher(containerRef, "width");
  const dispatch = useDispatch();
  const currentUserView = useMemo(
    () => getView(userViewId),
    [userViewId, getView]
  );

  useEffect(() => {
    if (firstUnAvailableViewId === -1) {
      setAvailableViews(allViews);
    } else {
      setAvailableViews(allViews.slice(0, firstUnAvailableViewId));
    }
  }, [firstUnAvailableViewId, allViews, setAvailableViews]);

  useEffect(() => {
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
  }, [allViews, dispatch, currentUserView, lastBreakAt, width]);

  return <>{props.children}</>;
};
