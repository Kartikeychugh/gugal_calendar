import { startOfWeek } from "date-fns";

export const getViewKey = (date: number) => {
  const start = startOfWeek(date);
  return start.valueOf();
};
