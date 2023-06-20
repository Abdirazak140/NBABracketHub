import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import AccountInfo from "./pages/Settings";
import MakePredictions from "./pages/MakePredictions";
import Overview from "./pages/Overview";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const fireApp = initializeApp(firebaseConfig);
const database = getDatabase(fireApp);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard/Overview" element={<Overview/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard/Settings" element={<AccountInfo/>}></Route>
          <Route path="/make-bracket-predictions" element={<MakePredictions/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
export { fireApp, database };