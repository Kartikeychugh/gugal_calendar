import { PropsWithChildren, useState } from "react";
import { CalendarDimensionCellHeightContext } from "./calendar-dimension-cell-height.context";

export const CalendarDimensionCellHeightProvider = (
  props: PropsWithChildren<{
    minCellHeight: number;
  }>
) => {
  const { minCellHeight } = props;
  const [_cellHeight, _setCellHeight] = useState<number>(minCellHeight);

  const setCellHeight = (cellHeight: number) => {
    _setCellHeight(Math.max(cellHeight, minCellHeight));
  };

  return (
    <CalendarDimensionCellHeightContext.Provider
      value={{ cellHeight: _cellHeight, setCellHeight }}
    >
      {props.children}
    </CalendarDimensionCellHeightContext.Provider>
  );
};
