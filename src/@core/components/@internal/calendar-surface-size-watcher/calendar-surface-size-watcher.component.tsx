import { PropsWithChildren, useCallback, useRef, useState } from "react";
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
  const debounceRef = useRef<any>(null);

  useSizeWatcher(
    containerRef,
    true,
    "width",
    useCallback(
      (newWidth: number) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          if (newWidth === null || newWidth === 0) {
            return;
          }

          if (
            newWidth <= userView.breakpoint &&
            (lastBreakAt === null || lastBreakAt !== userView.breakpoint)
          ) {
            updateResponsiveView(0);
            updateViewsFromGridWidth(newWidth);
            setLastBreakAt(userView.breakpoint);
          } else if (newWidth > userView.breakpoint && lastBreakAt !== null) {
            updateViewsFromGridWidth(newWidth);

            updateResponsiveView(null);
            setLastBreakAt(null);
          }
        }, 250);
      },
      [updateResponsiveView, userView, lastBreakAt, updateViewsFromGridWidth]
    )
  );

  return <>{props.children}</>;
};
