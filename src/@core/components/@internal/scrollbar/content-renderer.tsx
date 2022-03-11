import React, { PropsWithChildren } from "react";

export const ContentRenderer = React.forwardRef<
  React.MutableRefObject<HTMLElement | null | undefined>,
  PropsWithChildren<{ style?: React.CSSProperties | undefined }>
>((props, ref): any => {
  const { style = {} } = props;

  return (
    <div
      ref={ref as any}
      style={{
        inset: "0px",
        position: "absolute",
        overflow: "scroll",
        ...style,
      }}
      className="no-scrollbar"
    >
      {props.children}
    </div>
  );
});
