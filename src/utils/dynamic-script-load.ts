import { Defer } from "./defer";

export const dynamicScriptLoad = (url: string) => {
  const defer = new Defer<void>();
  const script = document.createElement("script");
  script.setAttribute("src", url);
  script.setAttribute("id", "gapi");
  script.onload = () => {
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
          defer.resolve();
        });
    });
  };

  document.body.appendChild(script);
  return defer.promise;
};
