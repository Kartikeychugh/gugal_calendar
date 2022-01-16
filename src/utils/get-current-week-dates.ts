export const getWorkWeek = (view: number) => {
  if (view === 1) {
    return [getToday().toISOString()];
  }

  let prev = getStartOfWeek();
  const workWeek: string[] = [];

  for (let i = 0; i < view; i++) {
    const next = nextDate(prev);
    workWeek.push(next.toISOString());
    prev = next;
  }

  return workWeek;
};

export const nextDate = (date: Date) => {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  return next;
};

export const getStartOfWeek = () => {
  const curr = normaliseDate(new Date());
  curr.setDate(curr.getDate() - (curr.getDay() ? curr.getDay() : 7));
  return curr;
};

export const normaliseDate = (date: Date) => {
  return startOfDay(date);
};

export const startOfDay = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const isSameDate = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const getToday = () => {
  return normaliseDate(new Date());
};

export const isWeekEnd = (date: Date) => {
  return date.getDay() === 6 || date.getDay() === 0;
};
