import { PropsWithChildren, useEffect, useRef, useState } from "react";

const findWidth = (content: string, fontSize: string, parent: HTMLElement) => {
  const ele = document.createElement("div");

  ele.style.whiteSpace = "nowrap";
  ele.style.visibility = "hidden";
  ele.style.position = "absolute";
  ele.style.fontWeight = "inherit";
  ele.style.letterSpacing = "inherit";
  ele.style.fontSize = fontSize;

  ele.innerText = content;

  parent.append(ele);
  const width = ele.clientWidth;
  ele.remove();
  return Math.floor(width);
};

const binarySearch = (width: number, text: string, parent: HTMLElement) => {
  let l = 1,
    r = 100;

  while (l <= r) {
    const m = (l + r) / 2;
    const mTextWidth = findWidth(text, `${m}%`, parent);

    if (mTextWidth === width) {
      return m - 1;
    }

    if (mTextWidth > width) {
      r = m - 1;
    } else {
      if (findWidth(text, `${m + 1}%`, parent) >= width) {
        return m;
      }
      l = m + 1;
    }
  }

  return r;
};

const biggestFontToFitWidth = (
  width: number,
  currFontSize: number,
  text: string,
  parent: HTMLElement
) => {
  if (!width || !text) {
    return currFontSize;
  }

  return binarySearch(width, text, parent);
};

export const FluidText = (
  props: PropsWithChildren<{ minFontPercentage?: number }>
) => {
  const { minFontPercentage = 90 } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [fluidTextContainerWidth, setFluidTextContainerWidth] =
    useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(100);
  let debouncer = useRef<number | undefined>(undefined);
  const observerRef = useRef<any>(
    new ResizeObserver((entries) => {
      clearTimeout(debouncer.current);

      const entry = entries[0];
      if (!ref.current) {
        return;
      }

      debouncer.current = setTimeout(() => {
        setFluidTextContainerWidth(Math.floor(entry.contentRect.width));
      }, 250) as unknown as number;
    })
  );

  useEffect(() => {
    if (ref.current) {
      observerRef.current.observe(ref.current);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setFontSize(
      Math.max(
        Math.min(
          biggestFontToFitWidth(
            fluidTextContainerWidth,
            fontSize,
            ref.current.innerText,
            ref.current.parentElement!
          ),
          100
        ),
        minFontPercentage
      )
    );
  }, [fontSize, fluidTextContainerWidth, setFontSize, minFontPercentage]);

  return (
    <div
      id="FluidText-container"
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: `${fontSize}%`,
        fontWeight: "inherit",
        width: "100%",
        whiteSpace: "nowrap",
        transition: "0.2s all ease-in-out",
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
};
