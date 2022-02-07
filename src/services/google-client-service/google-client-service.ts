import { Defer, dynamicScriptLoad } from "../../utils";

export class GoogleGAPIService {
  private defer = new Defer<void>();

  public initialise() {
    if (!window.gapi) {
      dynamicScriptLoad("https://apis.google.com/js/platform.js").then(() => {
        gapi.load("client:auth2", () => {
          gapi.client
            .init({
              apiKey: process.env.REACT_APP_FIREBASE_apiKey!,
              clientId: process.env.REACT_APP_FIREBASE_clientId!,
              scope: "https://www.googleapis.com/auth/calendar",
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
              ],
            })
            .then(() => {
              this.defer.resolve();
            });
        });
      });
    }
  }

  public async ensureGAPIInitialised() {
    return this.defer.promise;
  }

  public getClient() {
    return this.defer.promise.then(() => {
      return gapi.client;
    });
  }

  public getAuth() {
    return this.defer.promise.then(() => {
      return gapi.auth2.getAuthInstance();
    });
  }
}
