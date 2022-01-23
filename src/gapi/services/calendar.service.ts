import { endOfWeek, startOfWeek } from "date-fns";
import { Defer } from "../../firebase/utils/defer";
import { ICalendarClientEvent } from "../../models/Events";
import { dynamicScriptLoad } from "../../utils/dynamic-script-load";

export interface IGoogleCalendarService {
  getEvents(start: Date): Promise<CalendarEventItem[]>;
  createEvent(event: ICalendarClientEvent): Promise<any>;
  getColors(): Promise<CalendarColors>;
}

export class GoogleCalendarService implements IGoogleCalendarService {
  private defer = new Defer<void>();

  constructor() {
    dynamicScriptLoad("https://apis.google.com/js/api.js").then(() => {
      this.defer.resolve();
    });
  }

  public async getEvents(start: Date) {
    return this.defer.promise.then(async () => {
      const s = startOfWeek(start);
      const e = endOfWeek(start);

      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: s.toISOString(),
        timeMax: e.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      });

      return response.result.items;
    });
  }

  public async createEvent(event: ICalendarClientEvent) {
    return this.defer.promise.then(async () => {
      const response = await (gapi.client.calendar as any).events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
      });
      return response.result;
    });
  }

  public async getColors() {
    return this.defer.promise.then(async () => {
      const response = await gapi.client.calendar.colors.get();
      return response.result;
    });
  }
}
