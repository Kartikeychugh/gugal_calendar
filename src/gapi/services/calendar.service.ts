import { Defer } from "../../firebase/utils/defer";
import { CalendarEvent } from "../../models/Events";
import { dynamicScriptLoad } from "../../utils/dynamic-script-load";
import { normaliseDate } from "../../utils/get-current-week-dates";

export interface IGoogleCalendarService {
  getEvents(): Promise<CalendarEventItem[]>;
  createEvent(event: any): Promise<any>;
}

export class GoogleCalendarService implements IGoogleCalendarService {
  private defer = new Defer<void>();

  constructor() {
    dynamicScriptLoad("https://apis.google.com/js/api.js").then(() => {
      this.defer.resolve();
    });
  }

  public async getEvents() {
    return this.defer.promise.then(async () => {
      var start = new Date();
      start = normaliseDate(start);
      start.setDate(
        start.getDate() - (start.getDay() ? start.getDay() : 7) + 1
      );

      var end = new Date();
      end = normaliseDate(end);
      end.setDate(end.getDate() - (end.getDay() ? end.getDay() : 7) + 7);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(0);
      end.setMilliseconds(0);

      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
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
      });
      return response.result;
    });
  }
}
