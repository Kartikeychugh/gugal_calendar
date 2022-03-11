export const convertScrollTravelToHeadTravel = (
  scrollTravel: number,
  scrollFactor: number
) => {
  return scrollTravel / scrollFactor;
};

export const convertHeadTravelToScrollTravel = (
  headScroll: number,
  scrollFactor: number
) => {
  return headScroll * scrollFactor;
};
