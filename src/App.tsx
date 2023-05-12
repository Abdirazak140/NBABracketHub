import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import AccountInfo from "./pages/AccountInfo";
import MakePredictions from "./pages/MakePredictions";


const firebaseConfig = {
  apiKey: "AIzaSyCU-njROKe-uM_yc03aUabAmAuomAP8Cv4",
  authDomain: "sportbracketpredictions.firebaseapp.com",
  databaseURL: "https://sportbracketpredictions-default-rtdb.firebaseio.com/",
  projectId: "sportbracketpredictions",
  storageBucket: "sportbracketpredictions.appspot.com",
  messagingSenderId: "826690539160",
  appId: "1:826690539160:web:91d50a78a009d6f7df8aed",
  measurementId: "G-DLSPKFYJVD"
};

const fireApp = initializeApp(firebaseConfig);
const database = getDatabase(fireApp);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/account-info" element={<AccountInfo/>}></Route>
          <Route path="/make-bracket-predictions" element={<MakePredictions/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
export { fireApp, database };