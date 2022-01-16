import { Defer } from "../firebase/utils/defer";

export const dynamicScriptLoad = (url: string) => {
  const defer = new Defer<void>();
  const script = document.createElement("script");
  script.setAttribute("src", url);
  script.setAttribute("id", "gapi");
  script.onload = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: "AIzaSyAHN5KtQh-2bndpL-NAp5iFQwgeT0ByMK0",
          clientId:
            "214292075187-tv75vua1r3afdfud7k4bcfjeocin1it4.apps.googleusercontent.com",
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
