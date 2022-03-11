import { addMinutes, startOfDay, isBefore } from "date-fns";
import { convertDistanceFromTopToMinutes } from "../../../utils";

export const nearestToMultiple = (value: number, multipleOf: number) => {
  const lowerMultiple = Math.floor(value / multipleOf) * multipleOf;
  const upperMultiple = Math.ceil(value / multipleOf) * multipleOf;

  if (value - lowerMultiple < upperMultiple - value) {
    return lowerMultiple;
  } else {
    return upperMultiple;
  }
};

export const calculateBlankeEventTimings = (
  height: number,
  top: number,
  date: Date,
  cellHeight: number
) => {
  const adjustedTop = height < 0 ? Math.max(top + height, 0) : top;
  const adjustedHeight = Math.abs(height);

  const startDate = addMinutes(
    startOfDay(date),
    convertDistanceFromTopToMinutes(adjustedTop, cellHeight)
  );
  const endDate = addMinutes(
    startOfDay(date),
    convertDistanceFromTopToMinutes(adjustedTop + adjustedHeight, cellHeight)
  );

  const adjustedStartDate = isBefore(startDate, endDate) ? startDate : endDate;
  const adjustedEndDate = isBefore(startDate, endDate) ? endDate : startDate;
  return { adjustedTop, adjustedHeight, adjustedStartDate, adjustedEndDate };
};
