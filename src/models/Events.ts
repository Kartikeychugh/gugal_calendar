import { v4 as uuidv4 } from "uuid";

export const CalendarEvent = (
  summary: string,
  description: string,
  start: Date,
  end: Date
) => {
  return {
    id: uuidv4().replaceAll("-", ""),
    summary,
    description,
    start: {
      dateTime: start.toISOString(),
    },
    end: {
      dateTime: end.toISOString(),
    },
    clientLie: true,
  };
};
