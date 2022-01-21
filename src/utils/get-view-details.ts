import { startOfWeek, addDays, eachDayOfInterval } from "date-fns";

const views = [
  {
    fromDay: 0,
    numberOfDays: 1,
    title: "Day",
    change: 1,
    pointer: 0,
    viewId: 0,
  },
  {
    fromDay: 0,
    numberOfDays: 7,
    change: 7,
    title: "Week",
    pointer: 0,
    viewId: 1,
  },
  {
    fromDay: 1,
    numberOfDays: 5,
    change: 7,
    title: "Work Week",
    pointer: 1,
    viewId: 2,
  },
];

export const getView = (viewId: number, pointer: number) => {
  const view = views[viewId];
  if (viewId === 0) {
    view.fromDay = pointer;
    view.pointer = pointer;
  } else {
    view.pointer = pointer;
  }

  return view;
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

export const getViewKey = (date: Date) => {
  const start = startOfWeek(date);
  return start.valueOf();
};
