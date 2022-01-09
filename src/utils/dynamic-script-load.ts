declare var gapi: any;

export const dynamicScriptLoad = (url: string) => {
  const script = document.createElement("script");
  script.setAttribute("src", url);
  script.setAttribute("id", "gapi");
  script.onload = () => {
    console.log("Script loaded");
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: "AIzaSyAJNOsXo-vqcU-s0bvEKCgQ13cjJqhS9b8",
          clientId:
            "214292075187-tv75vua1r3afdfud7k4bcfjeocin1it4.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/calendar.readonly",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        })
        .then(() => {
          console.log(
            "hello world",
            gapi.auth2.getAuthInstance().isSignedIn.get()
          );
        });
    });
  };

  document.body.appendChild(script);
};
