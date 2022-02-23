import React from "react";

export const ContentRenderer = React.forwardRef<
  React.MutableRefObject<HTMLElement | null | undefined>,
  {
    content: React.ReactNode;
    scrollbarWidth: number;
    overlay: boolean;
    containerRef: React.MutableRefObject<HTMLElement | null | undefined>;
  }
>((props, ref): any => {
  const { content, scrollbarWidth, overlay, containerRef } = props;
  return React.Children.map(content, (child: any, index: number) => (
    <div
      ref={containerRef as any}
      style={{
        display: "flex",
        ...child.props.style,
        className: child.props.className,
      }}
    >
      {React.cloneElement(child, {
        ...child.props,
        style: { overflowY: "scroll", width: "100%" },
        className: "no-scrollbar",
        ref,
      })}
      <div style={{ width: overlay ? "0px" : `${scrollbarWidth}px` }}></div>
    </div>
  ));
});
