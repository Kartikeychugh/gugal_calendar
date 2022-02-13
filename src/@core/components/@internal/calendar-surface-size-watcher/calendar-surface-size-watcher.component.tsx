import { PropsWithChildren, useEffect, useState } from "react";
import { useSizeWatcher } from "../../../hooks";
import { useCalendarViewManager } from "../../../providers";
import { useCalendarAvailableViews } from "../../../providers/calendar-available-views";

export const CalendarSurfaceSizeWatcher = (
  props: PropsWithChildren<{
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
  }>
) => {
  const { userView, updateResponsiveView } = useCalendarViewManager();
  const { updateViewsFromGridWidth } = useCalendarAvailableViews();

  const { containerRef } = props;
  const [lastBreakAt, setLastBreakAt] = useState<number | null>(null);

  const width = useSizeWatcher(containerRef, true, "width");

  useEffect(() => {
    if (width === null || width === 0) {
      return;
    }

    updateViewsFromGridWidth(width);

    if (
      width <= userView.breakpoint &&
      (lastBreakAt === null || lastBreakAt !== userView.breakpoint)
    ) {
      updateResponsiveView(0);
      setLastBreakAt(userView.breakpoint);
    } else if (width > userView.breakpoint && lastBreakAt !== null) {
      updateResponsiveView(null);
      setLastBreakAt(null);
    }
  }, [
    updateResponsiveView,
    userView,
    lastBreakAt,
    width,
    updateViewsFromGridWidth,
  ]);

  return <>{props.children}</>;
};
