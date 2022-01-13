import { normaliseDate } from "../../../utils/get-current-week-dates";

export interface IFirebaseGAPIService {
  getEvents(): Promise<CalendarEventItem[]>;
  getColors(): Promise<CalendarColors>;
}

export class FirebaseGAPIService implements IFirebaseGAPIService {
  private gapi: GAPI;

  constructor(_gapi: GAPI) {
    this.gapi = _gapi;
  }

  public async getEvents() {
    var start = new Date();
    start = normaliseDate(start);
    start.setDate(start.getDate() - start.getDay() + 1);

    var end = new Date();
    end = normaliseDate(end);
    end.setDate(end.getDate() - end.getDay() + 7);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(0);
    end.setMilliseconds(0);

    const response = await this.gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return response.result.items;
  }

  public async getColors() {
    const response = await this.gapi.client.calendar.colors.get();
    return response.result;
  }
}
