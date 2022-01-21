import { endOfWeek, startOfWeek } from "date-fns";
import { Defer } from "../../firebase/utils/defer";
import { dynamicScriptLoad } from "../../utils/dynamic-script-load";

export interface IGoogleCalendarService {
  getEvents(start: Date): Promise<CalendarEventItem[]>;
  createEvent(event: any): Promise<any>;
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
      // var start = new Date();
      // start = normaliseDate(start);
      // start.setDate(
      //   start.getDate() - (start.getDay() ? start.getDay() : 7) + 1
      // );

      // var end = new Date();
      // end = normaliseDate(end);
      // end.setDate(end.getDate() - (end.getDay() ? end.getDay() : 7) + 7);
      // end.setHours(23);
      // end.setMinutes(59);
      // end.setSeconds(0);
      // end.setMilliseconds(0);

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

  public async createEvent(event: any) {
    return this.defer.promise.then(async () => {
      const response = await (gapi.client.calendar as any).events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
      });
      return response.result;
    });
  }
}
