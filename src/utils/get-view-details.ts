import {
  startOfWeek,
  startOfToday,
  addDays,
  eachDayOfInterval,
  isMonday,
  previousMonday,
} from "date-fns";

export const getWeekDetails = () => {
  const start = startOfWeek(new Date());
  return getViewDetails(start.valueOf(), 7);
};

export const getViewDetails = (
  _start: number | Date,
  _numberOfDays: number
) => {
  const start = new Date(_start);
  const end = addDays(start, _numberOfDays - 1);
  const week = eachDayOfInterval({ start, end });

  return { start, end, week };
};

export const getWorkWeekDetails = () => {
  const today = startOfToday();
  if (isMonday(today)) {
    return getViewDetails(today.valueOf(), 5);
  } else {
    const start = previousMonday(today);
    const end = addDays(start, 4);
    const week = eachDayOfInterval({ start, end });

    return { start, end, week };
  }
};

export const getViewKey = (date: Date) => {
  const start = startOfWeek(date);
  return start.valueOf();
};
