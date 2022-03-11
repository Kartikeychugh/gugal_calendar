export const pixelToMinuteRatio = (cellHeight: number) => {
  return cellHeight / 60;
};

export const convertDistanceFromTopToMinutes = (
  distancFromTop: number,
  cellHeight: number
) => {
  return distancFromTop / pixelToMinuteRatio(cellHeight);
};
