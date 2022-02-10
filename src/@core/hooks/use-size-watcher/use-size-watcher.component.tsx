import { useEffect, useMemo, useState } from "react";

export const useSizeWatcher = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  watchIfTrue: boolean,
  param: "height" | "width"
) => {
  const [width, setWidth] = useState(300);

  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      const width = entries[0].contentRect[param];
      setWidth(width);
    });
  }, [param]);

  useEffect(() => {
    if (containerRef.current && watchIfTrue) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observer, containerRef, watchIfTrue]);

  return width;
};
