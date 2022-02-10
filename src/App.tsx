import "./App.css";

import { CalendarReduxProvider } from "./redux";
import { GugalCalendar } from "./components";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_apiKey,
//   authDomain: process.env.REACT_APP_FIREBASE_authDomain,
//   projectId: process.env.REACT_APP_FIREBASE_projectId,
//   storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
//   appId: process.env.REACT_APP_FIREBASE_appId,
//   measurementId: process.env.REACT_APP_FIREBASE_measurementId,
// };

let theme = createTheme({
  palette: { mode: "dark" },
});

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <CalendarReduxProvider>
        <ThemeProvider theme={theme}>
          <GugalCalendar
            minColumnWidth={10}
            minCellHeight={30}
            featureFlags={{
              hideCommandBar: false,
              responsiveCellHeight: true,
            }}
          />
        </ThemeProvider>
      </CalendarReduxProvider>
    </div>
  );
}

export default App;
