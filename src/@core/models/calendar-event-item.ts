import { v4 as uuidv4 } from "uuid";

export type ICalendarEventItem = {
  layout: {
    top: string;
    height: string;
    left: string;
    width: string;
  };
} & ICalendarEvent &
  Partial<ICalendarClientEventItem>;

export const clientEventStatus = {
  draft: "draft",
  syncing: "syncing",
};

export interface ICalendarClientEventItem extends ICalendarEvent {
  client: {
    status: string;
  };
  conferenceData?: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
    };
  };
}

export interface ICalendarEvent {
  id: CalendarEventItem["id"];
  colorId?: string;
  hangoutLink?: CalendarEventItem["hangoutLink"];
  summary?: CalendarEventItem["summary"];
  description?: CalendarEventItem["description"];
  start: Omit<CalendarEventItem["start"], "timeZone" | "date">;
  end: Omit<CalendarEventItem["end"], "timeZone" | "date">;
  colors: {
    calendar: {
      backgroundColor: string;
    };
    event: {
      backgroundColor: string;
      foregroundColor: string;
    };
  };
}

export const GetCalendarClientEvent = (
  start: Date,
  end: Date,
  defaultColorId = "1"
): ICalendarClientEventItem => {
  return {
    // colorId: defaultColorId,
    id: uuidv4().replaceAll("-", ""),
    summary: "",
    description: "",
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
    client: {
      status: clientEventStatus.draft,
    },
    colors: {
      calendar: {
        backgroundColor: "red",
      },
      event: {
        backgroundColor: "red",
        foregroundColor: "white",
      },
    },
  };
};
