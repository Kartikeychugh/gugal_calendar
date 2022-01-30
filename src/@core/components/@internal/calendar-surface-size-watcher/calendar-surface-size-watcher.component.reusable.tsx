import {
  PropsWithChildren,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { useSizeWatcher } from "../../../hooks";
import { CalendarViewContextReusable } from "../../../providers/calendar-view/calendar-view.context.reusable";

export const CalendarSurfaceSizeWatcherReusable = (
  props: PropsWithChildren<{
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
  }>
) => {
  const {
    getView,
    updateResponsiveView,
    allViews,
    userViewId,
    setAvailableViews,
  } = useContext(CalendarViewContextReusable);

  const { containerRef } = props;
  const [lastBreakAt, setLastBreakAt] = useState<number | null>(null);
  const [firstUnAvailableViewId, setFirstUnAvailableViewId] = useState<number>(
    allViews.length
  );
  const width = useSizeWatcher(containerRef, "width");
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
      updateResponsiveView(0);
      setLastBreakAt(currentUserView.breakpoint);
    } else if (width > currentUserView.breakpoint && lastBreakAt !== null) {
      updateResponsiveView(null);
      setLastBreakAt(null);
    }
  }, [allViews, updateResponsiveView, currentUserView, lastBreakAt, width]);

  return <>{props.children}</>;
};
