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

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#B296FF",
      main: "#471AC2",
      dark: "#3300C1",
    },
    backgroundImage: {
      light:
        "linear-gradient(rgba(178,150,255, 0.05), rgba(178,150,255, 0.05))",
      main: "linear-gradient(rgba(178,150,255, 0.1), rgba(178,150,255, 0.1))",
      dark: "linear-gradient(rgba(178,150,255, 0.5), rgba(178,150,255, 0.5))",
      darker: "linear-gradient(rgba(178,150,255, 0.8), rgba(178,150,255, 0.8))",
    },
    timeIndicator: `#F6C288`,
    timeIndicatorGridHighlighter: "rgba(246,194,136, 0.8)",
    action: {
      hover: "rgba(178,150,255, 0.1)",
      selected: "rgba(178,150,255, 0.2)",
      focus: "rgba(178,150,255, 0.3)",
      disabled: "rgba(178,150,255, 0.8)",
    },
  },
});

// let lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     // primary: {
//     //   light: "#C5FFCF",
//     //   main: "#94D27B",
//     //   dark: "#63A526",
//     // },
//     backgroundImage: {
//       light: "linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02))",
//       main: "linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08))",
//       dark: "linear-gradient(rgba(0, 0, 0 ,0.16), rgba(0, 0, 0, 0.16))",
//       darker: "linear-gradient(rgba(255, 255, 255 ,0), rgba(255, 255, 255, 0))",
//     },
//     timeIndicator: "red",
//   },
// });

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <CalendarReduxProvider>
        <ThemeProvider theme={darkTheme}>
          <GugalCalendar
            minColumnWidth={100}
            minCellHeight={30}
            hideCommandBar={false}
            responsiveCellHeight={true}
          />
        </ThemeProvider>
      </CalendarReduxProvider>
    </div>
  );
}

export default App;
