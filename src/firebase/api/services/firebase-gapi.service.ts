export interface IFirebaseGAPIService {
  getEvents(start: string, end: string): Promise<CalendarEventItem[]>;
  getColors(): Promise<CalendarColors>;
}

export class FirebaseGAPIService implements IFirebaseGAPIService {
  private gapi: GAPI;

  constructor(_gapi: GAPI) {
    this.gapi = _gapi;
  }

  public async getEvents(start: string, end: string) {
    var date = new Date();
    date.setDate(date.getDate() + 7);
    const response = await this.gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: start,
      timeMax: end,
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
