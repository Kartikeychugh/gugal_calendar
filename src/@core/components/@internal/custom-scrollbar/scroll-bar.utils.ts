export const convertToHeadTravel = (
  pageScroll: number,
  scrollFactor: number
) => {
  return pageScroll / scrollFactor;
};

export const convertToPageScroll = (
  headTravel: number,
  scrollFactor: number
) => {
  return headTravel * scrollFactor;
};
