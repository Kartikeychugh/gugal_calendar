import { startOfWeek, addDays, eachDayOfInterval } from "date-fns";

export const allViews = [
  {
    fromDay: 0,
    numberOfDays: 1,
    title: "Day",
    change: 1,
    viewId: 0,
    breakpoint: 0,
  },
  {
    fromDay: 1,
    numberOfDays: 5,
    change: 7,
    title: "Work Week",
    viewId: 1,
    breakpoint: 600,
  },
  {
    fromDay: 0,
    numberOfDays: 7,
    change: 7,
    title: "Week",
    viewId: 2,
    breakpoint: 900,
  },
];

export const getView = (viewId: number, fromDay?: number) => {
  const view = allViews[viewId];
  if (viewId === 0 && fromDay !== undefined) {
    view.fromDay = fromDay;
  }
  return view;
};

export const getWeekDetails = (
  _start: number | Date,
  _numberOfDays: number
) => {
  const start = new Date(_start);
  const end = addDays(start, _numberOfDays - 1);
  const week = eachDayOfInterval({ start, end });

  return { week };
};

export const getViewKey = (date: Date) => {
  const start = startOfWeek(date);
  return start.valueOf();
};
