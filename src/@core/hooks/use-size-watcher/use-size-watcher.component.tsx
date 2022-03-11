import { useEffect, useMemo } from "react";

export const useSizeWatcher = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  watchIfTrue: boolean,
  param: "height" | "width",
  callback: (newdimension: number) => void
) => {
  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      const width = entries[0].contentRect[param];
      callback(width);
    });
  }, [param, callback]);

  useEffect(() => {
    if (containerRef.current && watchIfTrue) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observer, containerRef, watchIfTrue]);
};
