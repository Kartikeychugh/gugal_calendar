import { Defer } from "../../firebase";

export interface IGoogleAuthenicationService {
  init: () => Promise<void>;
  initPromise: () => Promise<void>;
  isSignedIn: () => boolean;
  signIn: () => Promise<void>;
}
export class GoogleAuthenicationService implements IGoogleAuthenicationService {
  private gapi: GAPI;
  private defer: Defer<void>;

  constructor(gapi: GAPI) {
    this.gapi = gapi;
    this.defer = new Defer<void>();
  }

  public init() {
    return this.gapi.client
      .init({
        apiKey: "AIzaSyAHN5KtQh-2bndpL-NAp5iFQwgeT0ByMK0",
        clientId:
          "214292075187-tv75vua1r3afdfud7k4bcfjeocin1it4.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/calendar.readonly",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      })
      .then(() => {
        this.defer.resolve();
      });
  }

  public initPromise() {
    return this.defer.promise;
  }

  public isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  public signIn() {
    return gapi.auth2.getAuthInstance().signIn();
  }
}
