import "./App.css";

import { CalendarReduxProvider } from "./redux";
import { GugalCalendar } from "./components/gugal-calendar";

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

function App() {
  return (
    <div className="App">
      <CalendarReduxProvider>
        <GugalCalendar
          minColumnWidth={100}
          minCellHeight={30}
          featureFlags={{
            hideCommandBar: false,
            responsiveCellHeight: true,
          }}
        />
      </CalendarReduxProvider>
    </div>
  );
}

export default App;
