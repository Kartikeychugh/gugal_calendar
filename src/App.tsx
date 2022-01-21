import "./App.css";

import { FirebaseAuthLayer } from "./firebase/auth";
import { FirebaseProvider } from "./firebase";
import { Calendar, PrivateRoute } from "./components";

import { CalendarReduxProvider } from "./redux/provider/provider";
import { LoadingScreen } from "./components/loading-screen";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0AWmTdBUcZFZIbwxSX6sNXxhlWU5zv3s",
  authDomain: "gugal-calendar.firebaseapp.com",
  projectId: "gugal-calendar",
  storageBucket: "gugal-calendar.appspot.com",
  messagingSenderId: "438284324130",
  appId: "1:438284324130:web:e9780ad9f4c9cbf505e97b",
  measurementId: "G-4GMF471CY0",
};

function App() {
  return (
    <div className="App">
      <FirebaseProvider firebaseOptions={firebaseConfig}>
        <FirebaseAuthLayer loading={() => <LoadingScreen />}>
          <PrivateRoute>
            <CalendarReduxProvider>
              <Calendar cellSize={60} timeGridWidth={45} />
            </CalendarReduxProvider>
          </PrivateRoute>
        </FirebaseAuthLayer>
      </FirebaseProvider>
    </div>
  );
}

export default App;
