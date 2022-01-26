import { useEffect, useMemo, useState } from "react";

export const useSizeWatcher = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  param: "height" | "width"
) => {
  const [width, setWidth] = useState(0);

  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      const width = entries[0].contentRect[param];
      setWidth(width);
    });
  }, [param]);

  useEffect(() => {
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observer, containerRef]);

  return width;
};
