import { Defer } from "./defer";

export const dynamicScriptLoad = (url: string) => {
  const defer = new Defer<void>();
  let gapiScript = document.getElementById("gapi");

  if (!gapiScript) {
    gapiScript = document.createElement("script");
    gapiScript.setAttribute("src", url);
    gapiScript.setAttribute("id", "gapi");
    document.body.appendChild(gapiScript);
  }

  gapiScript.onload = () => {
    defer.resolve();
  };

  return defer.promise;
};
