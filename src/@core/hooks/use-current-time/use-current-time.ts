import { useEffect, useState } from "react";

export const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const secondsToCompleteMinute = now.getSeconds();

    let y: any;
    const x = setTimeout(() => {
      const now = new Date();
      console.log(now.getSeconds());

      setTime(now);

      y = setInterval(() => {
        const now = new Date();
        console.log(now.getSeconds());

        setTime(now);
      }, 1000 * 60);
    }, 1000 * (60 - secondsToCompleteMinute));

    return () => {
      clearTimeout(x);
      if (y !== undefined) clearInterval(y);
    };
  }, []);

  return time;
};
