import { endOfWeek, startOfWeek } from "date-fns";
import { ICalendarClientEventItem } from "../../@core";
import { GoogleAuthenticationService } from "../google-authentication-service/google-authentication-service";
import { GoogleGAPIService } from "../google-client-service/google-client-service";

export interface IGoogleCalendarService {
  getEvents(start: number): Promise<CalendarEventItem[]>;
  createEvent(event: ICalendarClientEventItem): Promise<any>;
  getColors(): Promise<CalendarColors>;
}

export class GoogleCalendarService implements IGoogleCalendarService {
  private googleAuthenticationService: GoogleAuthenticationService;
  private googleGapiService: GoogleGAPIService;

  constructor(googleGapiService: GoogleGAPIService) {
    this.googleGapiService = googleGapiService;
    this.googleAuthenticationService = new GoogleAuthenticationService(
      this.googleGapiService
    );
  }

  public async getEvents(start: number) {
    return this.googleAuthenticationService.ensureSignIn().then(async () => {
      console.log("Ensured authentication");
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

  public async createEvent(event: ICalendarClientEventItem) {
    return this.googleAuthenticationService.ensureSignIn().then(async () => {
      const response = await (gapi.client.calendar as any).events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
      });
      return response.result;
    });
  }

  public async getColors() {
    return this.googleGapiService.ensureGAPIInitialised().then(async () => {
      const response = await gapi.client.calendar.colors.get();
      return response.result;
    });
  }
}
