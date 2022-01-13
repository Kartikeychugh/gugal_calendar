export const getColumnDate = (col: number) => {
  const firstColumnDate = new Date();
  const mondayDate = firstColumnDate.getDate() - firstColumnDate.getDay() + 1;
  const firstColummnDate = new Date().setDate(mondayDate + col);
  return firstColummnDate;
};
