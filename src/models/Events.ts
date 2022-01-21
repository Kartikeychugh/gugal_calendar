import { v4 as uuidv4 } from "uuid";

export interface ICalendarClientEvent {
  conferenceData?: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
    };
  };
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  client: {
    clientLie: boolean;
  };
}

export const CalendarEvent = (
  start: Date,
  end: Date,
  onlineMeeting = false
): ICalendarClientEvent => {
  return {
    id: uuidv4().replaceAll("-", ""),
    summary: "",
    description: "",
    start: {
      dateTime: start.toISOString(),
    },
    end: {
      dateTime: end.toISOString(),
    },
    client: {
      clientLie: true,
    },
    ...(onlineMeeting && {
      conferenceData: {
        createRequest: {
          requestId: uuidv4().replaceAll("-", ""),
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    }),
  };
};
