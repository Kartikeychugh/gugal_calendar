import { PropsWithChildren, useState } from "react";
import { useCalendarFeatureFlags } from "../calendar-feature-flags";
import { CalendarDimensionCellHeightContext } from "./calendar-dimension-cell-height.context";

export const CalendarDimensionCellHeightProvider = (
  props: PropsWithChildren<{
    minCellHeight: number;
  }>
) => {
  const { minCellHeight } = props;
  const { responsiveCellHeight } = useCalendarFeatureFlags();

  const [_cellHeight, _setCellHeight] = useState<number>(
    responsiveCellHeight ? 0 : minCellHeight
  );

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
