import { setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";

/**
 * Combines Date and Time from two different objects
 *
 * @param a Object whose Date needs to be used
 * @param b Object whose Time needs to be used
 * @returns A new Date object with combined date and time
 */
export const combineDateAndTime = (
  _a: Date | string | number,
  _b: Date | string | number
) => {
  const a = new Date(_a);
  const b = new Date(_b);

  return setHours(
    setMinutes(
      setSeconds(setMilliseconds(a, b.getMilliseconds()), b.getSeconds()),
      b.getMinutes()
    ),
    b.getHours()
  );
};
