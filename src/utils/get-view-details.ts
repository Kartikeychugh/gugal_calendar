import { startOfWeek, addDays, eachDayOfInterval } from "date-fns";

export const getWeekDetails = (
  _start: number | Date,
  _numberOfDays: number
) => {
  const start = new Date(_start);
  const end = addDays(start, _numberOfDays - 1);
  const week = eachDayOfInterval({ start, end });

  return { week };
};

export const getViewKey = (date: number) => {
  const start = startOfWeek(date);
  return start.valueOf();
};
