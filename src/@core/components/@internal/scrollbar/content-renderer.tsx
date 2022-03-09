import React, { PropsWithChildren } from "react";

export const ContentRenderer = React.forwardRef<
  React.MutableRefObject<HTMLElement | null | undefined>,
  PropsWithChildren<{}>
>((props, ref): any => {
  return (
    <div
      ref={ref as any}
      style={{ inset: "0px", position: "absolute", overflow: "scroll" }}
      className="no-scrollbar"
    >
      {props.children}
    </div>
  );
});
