import { useState } from "react";

export const useCurrentTime = () => {
  const now = new Date();
  const [time, setTime] = useState(now.getHours() * 60 + now.getMinutes());

  setInterval(() => {
    const now = new Date();
    setTime(now.getHours() * 60 + now.getMinutes());
  }, 1000 * 60);

  return time;
};
